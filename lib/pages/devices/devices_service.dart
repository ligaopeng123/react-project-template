import '../../utils/dio/request.dart' show Request;

const Map<String, String> DEVICES_STATUS_MAP = {
  'notActive': '未激活',
  'offline': '离线',
  'online': '在线',
  '1': '正常',
  '2': '异常',
};

const Map<String, dynamic> DEVICES_STATUS_MAP_COLOR = {
  'online': {'color': '#50C818', 'backgroundColor': 'rgba(80,200,24,0.08)'},
  'offline': {'color': '#F03030', 'backgroundColor': 'rgba(240,48,48,0.08)'},
  '1': {'color': '#50C818', 'backgroundColor': 'rgba(80,200,24,0.08)'},
  '2': {'color': '#F03030', 'backgroundColor': 'rgba(240,48,48,0.08)'},
  'notActive': {'color': '#666666', 'backgroundColor': '#F4F7FA'},
};

Future<Map<String, dynamic>> getDeviceList(pageParams, params) async {
  final Map query = {};
  query.addAll(params);
  final Map _params = {'query': query};
  _params.addAll(pageParams);
  final res = await Request.post(
    '/ubs-iot-ai/api/ubs/iot/ai/device/list',
    data: _params,
  );

  if (Request.checkStatus(res)) {
    return {'total': res['data']['totalSize'], 'data': res['data']['data']};
  }
  return {'total': 0, 'data': []};
}

/**
 * 获取事件概览
 */
Future<Map<String, dynamic>> getEventHome() async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/event/stat/today',
  );

  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return {'appEventStatTodayList': []};
}


/**
 * 获取产品类型
 */
Future<List> getProductType() async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/device/product/list',
  );

  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return [];
}
