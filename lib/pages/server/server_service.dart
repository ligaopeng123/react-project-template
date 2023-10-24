import '../../utils/dio/request.dart' show Request;

/**
 * 服务统计查询
 */
Future<Map> getServiceStatistics() async {
  final res = await Request.get('/ubs-iot-ai/api/ubs/iot/ai/service/sta/all');
  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return {'overview': {}, 'statistics': []};
}

/**
 * 获取服务列表
 */
Future<Map<String, dynamic>> getServiceList(params) async {
  final Map query = {'query': params};
  query.addAll(params);
  final res = await Request.post(
    '/ubs-iot-ai/api/ubs/iot/ai/service/sta/byType',
    data: query,
  );
  final data = res['data'] ?? {};
  if (Request.checkStatus(res)) {
    return {'total': data['totalSize'], 'data': data['data']};
  }
  return {'total': 0, 'data': []};
}


/**
 * 获取服务列表 /api/ubs/iot/ai/service/query/byType
 */
Future<Map<String, dynamic>> getServiceDetailsList(params) async {
  final Map query = {'query': params};
  query.addAll(params);
  final res = await Request.post(
    '/ubs-iot-ai/api/ubs/iot/ai/service/query/byType',
    data: query,
  );
  final data = res['data'] ?? {};
  if (Request.checkStatus(res)) {
    return {'total': data['totalSize'], 'data': data['data']};
  }
  return {'total': 0, 'data': []};
}