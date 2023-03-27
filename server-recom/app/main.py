import os, gc
import os.path as path
import re, math
import json

import numpy as np
import pandas as pd

from typing import Union

import uvicorn
from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel

URI_PREFIX = "/api/recom"
DATA_LOAD_DIR_PATH = path.join(".", "data", "output")


# bean(원두)에 관한 추천 정보 csv파일을 불러오는 메소드
# TODO: csv가 아닌 sql을 통해서 데이터를 로드하는 코드로 수정해야함
def load_bean_recom_data():
    df = pd.DataFrame()

    with open(
        path.join(DATA_LOAD_DIR_PATH, "bean_cbf_recom.csv"), encoding="UTF-8"
    ) as f:
        df = pd.read_csv(f)
        print("bean_cbf_recom loaded!!")
    return df


# FastAPI lifespan
# FastAPI가 구동될 때 initialization 해야 할 영역을 기술
# yield 이후에 적히는 구문들은 FastAPI가 종료 될 때 destruction 해야 할 영역을 기술
@asynccontextmanager
async def lifespan(app: FastAPI):
    print(path.join(DATA_LOAD_DIR_PATH, "bean_cbf_recom.csv"))

    # Load Data
    global bean_recom_data
    bean_recom_data = load_bean_recom_data()
    print(bean_recom_data.head(1))

    yield
    bean_recom_data.clear()


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    pass
    return {"message": "Hello FastAPI !!"}


# cbf 기반 원두 추천 알고리즘 호출
@app.get(URI_PREFIX + "/bean")
async def getBeanInfoAll():
    pass
    return {"message": "call /bean"}


@app.get(URI_PREFIX + "/bean/{beanId}")
async def getBeanRecom(beanId: Union[int, None] = None):
    print("id:{}, type:{}".format(beanId, type(beanId)))

    df_out = bean_recom_data.loc[bean_recom_data["id"] == beanId].to_dict("records")
    if not df_out:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return JSONResponse(content=df_out)


# cf 기반 추천 알고리즘 호출
@app.get(URI_PREFIX + "/user")
async def getUserInfoAll():
    pass
    return {"message": "call /user"}


@app.get(URI_PREFIX + "/user/{userId}")
async def getUserRecom(userId: Union[int, None] = None):
    pass
    return {"message": f"call /user/{userId}"}


# 스케줄러에서 추천 데이터 최신화를 요청할 때 호출
@app.get(URI_PREFIX + "/update")
async def updateRecom():
    pass
    return {"message": "call /update"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
