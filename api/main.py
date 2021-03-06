from io import BytesIO
from typing import Callable, Optional

import qrcode
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pymongo import MongoClient

from boxtracker.model import Box, BoxObjectFields, UpdateBox

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

db_client = MongoClient(host='boxtracker_mongo', port=27017)
box_collection = db_client['BOX_TRACKER'].BOXES


def pull_box(box_name: str) -> Optional[Box]:
    box = box_collection.find_one({"name": box_name})
    return None if box is None else Box.from_dict(box)


@app.put('/tracker/boxes')
async def box_put(box: Box, response: Response) -> Box:
    existing_box = pull_box(box.name)
    if existing_box is not None:
        # Box name already exists, return 409
        response.status_code = status.HTTP_409_CONFLICT
        return existing_box

    # Box name does not exist, inserting
    box_collection.insert_one(box.dict())
    response.status_code = status.HTTP_201_CREATED
    return box


@app.get('/tracker/boxes')
async def boxes_get() -> list[Box]:
    return list(map(Box.from_dict, box_collection.find()))


@app.get('/tracker/boxes/{box_name}')
async def box_get(box_name: str, response: Response) -> Optional[Box]:
    box = pull_box(box_name)
    if box is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return None
    return box


@app.patch('/tracker/boxes/{box_name}')
async def box_patch(box_name: str, box: UpdateBox, response: Response) -> Optional[Box]:
    existing_box = pull_box(box_name)

    if existing_box is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return None

    box.update_with(existing_box)

    box_collection.update_one({"name": existing_box.name},
                              {"$set": box.dict(by_alias=True)})
    return box


@app.delete('/tracker/boxes/{box_name}')
async def box_delete(box_name: str, response: Response) -> Optional[Box]:
    if pull_box(box_name) is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return None
    box_collection.delete_one({"name": box_name})
    response.status_code = status.HTTP_204_NO_CONTENT


@app.get('/tracker/qr')
async def box_get_qr(box: str, response: Response):
    if pull_box(box) is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return None

    url = f'192.168.1.15:8000/boxes/{box}'
    img = qrcode.make(url)
    buffered = BytesIO()
    img.save(buffered, format="jpeg")
    buffered.seek(0)
    return StreamingResponse(buffered, media_type='image/jpeg')


@app.get('/tracker/search')
async def box_search(query: str, fields: int = 1, exact: bool = False):
    fieldFlags = BoxObjectFields(fields)
    matches_func: Callable[[Box], bool] = (
        lambda box: box.matches_string(query, fieldFlags, exact))
    all_boxes = map(Box.from_dict, box_collection.find())
    matching_boxes = filter(matches_func, all_boxes)
    return list(matching_boxes)
