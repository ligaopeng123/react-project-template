import '../../utils/dio/request.dart' show Request;
import '../../utils/index.dart' show Tips;

/**
 * 修改密码
 */
Future<Map<String, dynamic>?> changePasswordApi(params) async {
  final res = await Request.put('/ubs-iot-authority/api/ubs/iot/auth/user/v1/password/update', data: params);
  if (Request.checkStatus(res)) {
    return res;
  } else {
    Tips.warn(Request.checkMsg(res));
  }
  return null;
}
