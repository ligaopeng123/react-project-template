import '../../utils/dio/request.dart' show Request;

/// 默认配置
const Map EVENT_LEVEL_MAP = {
  'LOWEST': '最低级',
  'LOW': '低级',
  'NORMAL': '中级',
  'HIGH': '高级',
  'HIGHEST': '最高级',
};

const Map EVENT_HANDLE_STATUS_MAP = {
  1: '已处理',
  0: '未处理',
  '1': '已处理',
  '0': '未处理',
};

const Map EVENT_HANDLE_STATUS_MAP_2 = {
  '1': '已处理',
  '0': '未处理',
};

const Map EVENT_HANDLE_STATUS_MAP_COLOR = {
  1: {'color': '#50C818', 'backgroundColor': 'rgba(80,200,24,0.08)'},
  0: {'color': '#F03030', 'backgroundColor': 'rgba(240,48,48,0.08)'},
  '1': {'color': '#50C818', 'backgroundColor': 'rgba(80,200,24,0.08)'},
  '0': {'color': '#F03030', 'backgroundColor': 'rgba(240,48,48,0.08)'},
};

final Map EVENT_LEVEL_MAP_COLOR = {
  'LOWEST': EVENT_HANDLE_STATUS_MAP_COLOR['1'],
  'LOW': {'color': '#3370FF', 'backgroundColor': 'rgba(51,112,255,0.08)'},
  'NORMAL': {'color': '#FFB000', 'backgroundColor': 'rgba(255,176,0,0.08)'},
  'HIGH': {'color': '#FF6000', 'backgroundColor': 'rgba(255,96,0,0.08)'},
  'HIGHEST': EVENT_HANDLE_STATUS_MAP_COLOR['0'],
};

Future<Map<String, dynamic>> getEventList(pageParams, params) async {
  final Map query = {};
  query.addAll(params);
  final Map _params = {'query': query};
  _params.addAll(pageParams);
  final res = await Request.post(
    '/ubs-iot-ai/api/ubs/iot/ai/event/list',
    data: _params,
  );

  if (Request.checkStatus(res)) {
    final Map<String, dynamic> redData =
        res['data'] as Map<String, dynamic> ?? {'totalSize': 0, 'data': []};
    return {'total': redData['totalSize'], 'data': redData['data']};
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
 * 获取应用概览数据
 */
Future<Map<String, dynamic>> getDeviceHomeData(params) async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/device/stat/query',
    queryParameters: params,
  );

  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return {'currentMonthTrendList': []};
}

/**
 * 获取字典数据
 */
Future<List> getDictData(String type) async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/manage/dictionary/${type}',
  );

  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return [];
}

/**
 * 获取事件类型
 */
Future<List> getEventType() async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/manage/alarmrule/list',
  );

  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return [];
}

/**
 * 区域查询
 */
Future<List> getAreaList() async {
  final res =
      await Request.get('/ubs-iot-authority/api/ubs/iot/auth/area/v1/tree/access');
  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return [];
}
