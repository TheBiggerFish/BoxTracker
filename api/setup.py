"""
This box tracker will give you a qr code for each box and allow you to 
register the contents as you pack.
"""

import setuptools

with open('README.md', 'r', encoding='utf-8') as fh:
    long_description = fh.read()

setuptools.setup(
    name='boxTrackerAPI-TheBiggerFish',
    version='1.0.0',
    author='TheBiggerFish',
    author_email='clhnumber4@gmail.com',
    description='This box tracker will give you a qr code for each box and '
                'allow you to register the contents as you pack.',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/TheBiggerFish/DiscordChatBot',
    packages=setuptools.find_packages(where='src'),
    package_dir={'': '.'},
    project_urls={},
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    install_requires=[
        'uvicorn',
        'pydantic',
        'fastapi',
        'pymongo',
        'qrcode',
        'pillow',
    ],
    python_requires='>=3.9',
)
