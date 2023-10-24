import '../models/common.m.dart';
import '../utils/dio/request.dart' show Request;
import '../config/app_env.dart' show appEnv;

/// 请求示例
Future<Object> getDemo() async {
  return Request.get(
    '/api',
    queryParameters: {'key': 'value'},
  );
}

Future<Object> postDemo() async {
  return Request.post('/api', data: {});
}

Future<Object> putDemo() async {
  return Request.put('/api', data: {});
}

/// 获取APP最新版本号, 演示更新APP组件
Future<NewVersionData> getNewVersion() async {
  // TODO: 替换为你的真实请求接口，并返回数据，此处演示直接返回数据
  var res = await Request.get(
    appEnv.appHelper['appVersionApi'] as String,
    queryParameters: {},
  ).catchError((e) => e);

  var data = Request.checkStatus(res) ? res['data'] : {};

  var resData = NewVersionRes.fromJson({
    "code": "0",
    "message": "success",
    "data": {
      "version": data['versionInfo'],
      "info": data['versionFeature']?.split('\n')
    }
  });
  return (resData.data ?? {}) as NewVersionData;
}
