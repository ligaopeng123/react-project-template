import {message as AntdMessage} from 'antd';

/**
 *
 * @param res
 * @constructor
 */
export interface MessageResponse {
    code: number,
    message: string
}

/**
 * 消息处理
 * @param {MessageResponse} res
 * @constructor
 */
const Message = (res: MessageResponse | any) => {
    if (res) {
        const {code, message} = res;
        if (code === 0) {
            AntdMessage.success(message);
        } else {
            AntdMessage.error(message);
        }
    } else {
        AntdMessage.error(`服务端异常！`);
    }
}

export default Message;