import '../../../utils/dio/request.dart';

Map APP_ICON = {
  'DENGTA_SECURITY': '',
  'INDUSTRY_CAMERA': '',
};

Future<List<dynamic>> getAppList() async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/manage/appid/list',
  );
  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return [];
}

/**
 * 获取所有设备统计+列表
 */
Future<Map<String, dynamic>> getDeviceList() async {
  final res = await Request.get(
    '/ubs-iot-ai/api/ubs/iot/ai/device/stat/all',
  );
  if (Request.checkStatus(res)) {
    return res['data'];
  }
  return {'appDeviceStatBeanList': []};
}


Map<String, dynamic> DEVICE_CONFIG =  {
  'name': '设备数',
  'icon': 'asset/images/home/deviceIcon.png',
  'bg': 'asset/images/home/deviceBg.png',
  'key': 'device',
  'color': '#3370FF'
};

Map<String, dynamic> DEVICE_CONFIG_OFF =  {
  'name': '离线设备数',
  'icon': 'asset/images/home/deviceOfflineIcon.png',
  'bg': 'asset/images/home/deviceOfflineBg.png',
  'key': 'deviceOffline',
  'color': '#F03030'
};

Map<String, dynamic> EVENT_CONFIG =  {
  'name': '事件数',
  'icon': 'asset/images/home/eventIcon.png',
  'bg': 'asset/images/home/eventsBg.png',
  'key': 'server',
  'color': '#50C818'
};