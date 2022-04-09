/**********************************************************************
 *
 * @模块名称: OEM
 *
 * @模块用途: OEM
 *
 * @创建人: ligaoming
 *
 * @date: 2021/7/23 11:06
 *
 * @版权所有: PGLI
 *
 **********************************************************************/
import React, {useState, useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {isUndefined} from "@gaopeng123/utils";
import OEM from "@/store/OEM";
import {getCurrentOemToStorage} from "@httpClient/Global";

const useOEM = (key: string) => {
    const [oem, setOem] = useState<any>('');
    const config = useRecoilValue(OEM);
    useEffect(() => {
        const allConfig: any = Object.assign({}, config);
        !isUndefined(allConfig[key]) && setOem(allConfig[key]);
    }, [config]);
    return oem;
};

export default useOEM;
