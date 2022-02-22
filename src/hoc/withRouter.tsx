/**********************************************************************
 *
 * @模块名称: withRouter
 *
 * @模块用途: withRouter 兼容react-router-dom 5 6
 *
 * @创建人: pgli
 *
 * @date: 2022/2/22 13:29
 *
 **********************************************************************/
import {useNavigate} from "react-router-dom";

export const withRouter = (Component: any) => {
    const Wrapper = (props: any) => {
        const history = useNavigate();
        return (
            <Component
                history={history}
                {...props}
            />
        );
    };
    return Wrapper;
};
