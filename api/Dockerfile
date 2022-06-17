FROM python:3.10
EXPOSE 8000

COPY . /boxapi/
WORKDIR /boxapi/

RUN pip install --upgrade pip
RUN pip install -e .

CMD ["uvicorn","main:app","--reload","--host","0.0.0.0"]
