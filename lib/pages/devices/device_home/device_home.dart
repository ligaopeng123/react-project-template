import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import '../../../components/card/card_base.dart';
import '../../../components/card/card_indicator_statistics.dart';
import '../../app_main/dashboard/dashboard_service.dart';
import '../components/app_device_table.dart';
import '../device_list/device_list.dart';
import './provider/device_home.p.dart';

class Device_home extends StatefulWidget {
  Device_home({Key? key}) : super(key: key);

  @override
  _Device_homeState createState() => _Device_homeState();
}

class _Device_homeState extends State<Device_home> {
  @override
  void initState() {
    super.initState();
    _initData();
  }

  final sizedBoxSpace = SizedBox(height: 6);

  final List<Map<String, dynamic>> todayEventData = [
    {'name': '设备数', 'key': 'devices', 'color': '#3370FF'},
    {'name': '离线设备数', 'key': 'deviceOffline', 'color': '#F03030'},
    {'name': '在线设备数', 'key': 'deviceOnline', 'color': '#50C818'}
  ];

  late Map<String, dynamic> todayEventValue = {
    'devices': '0',
    'deviceOffline': '0',
    'deviceOnline': '0',
  };

  final homeStore = new Device_homeStore();

  _initData() async {
    final Map<String, dynamic> _dataList = await getDeviceList();
    setState(() {
      todayEventValue = {
        'devices': _dataList['deviceTotal']?.toString(),
        'deviceOffline': _dataList['offlineTotal']?.toString(),
        'deviceOnline': _dataList['onlineTotal']?.toString(),
      };
      homeStore.setList(_dataList['appDeviceStatBeanList']);
    });
  }

  _refresh(value) {
    _initData();
  }

  @override
  Widget build(BuildContext context) {
    return PageRefresh(
        // extendBodyBehindDeviceBar: true,
        title: AppBarTitle(title: '设备概览'),
        onRefresh: () async {
          _initData();
        },
        children: [
          _events(),
          _deviceStatistics(),
        ]);
  }

  Widget _deviceStatistics() {
    return CardBase(
      title: '业务应用统计',
      child: Container(
        child: AppDeviceTable(homeStore: homeStore, refresh: _refresh),
      ),
    );
  }

  Widget _events() {
    return CardBase(
        title: '总计',
        onClick: () {
          pushNewScreenWithRouteSettings(
            context,
            screen: DeviceList(),
            settings: RouteSettings(name: '/DeviceList'),
            withNavBar: false, // OPTIONAL VALUE. True by default.
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          ).then(_refresh);
        },
        child: CardIndicatorStatistics(
            list: todayEventData, data: todayEventValue));
  }
}
