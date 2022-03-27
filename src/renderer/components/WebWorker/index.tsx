/**********************************************************************
 *
 * @模块名称: WebWorker
 *
 * @模块用途: WebWorker
 *
 * @创建人: pgli
 *
 * @date: 2022/3/9 14:10
 *
 **********************************************************************/
import React from 'react';
import {useWorker} from "@gaopeng123/hooks";

type WebWorkerProps = {};
const worker = new Worker(new URL('./test.worker.ts', import.meta.url));
const WebWorker: React.FC<WebWorkerProps> = (props) => {
    const workerData: any = useWorker({worker});
    return (
        <React.Fragment>
            {workerData?.data}
        </React.Fragment>
    )
};

export default WebWorker;
