import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import 'package:smart_iot_app/pages/app_main/dashboard/dashboard_service.dart';
import '../../../components/card/card_base.dart';
import '../../../components/card/card_indicator_statistics.dart';
import '../../../components/card/card_pie.dart';
import '../../../components/card/card_statistics.dart';
import '../../../utils/color/color_hex.dart';
import '../../devices/device_list/device_list.dart';
import '../components/event_type.dart';
import '../events_list/events_list.dart';
import '../events_service.dart';

class App_home extends StatefulWidget {
  App_home({Key? key, this.title, this.params}) : super(key: key);

  final String? title;
  final Map<String, dynamic>? params;

  @override
  _App_homeState createState() => _App_homeState();
}

class _App_homeState extends State<App_home> {
  @override
  void initState() {
    super.initState();
    _initData();
  }

  final sizedBoxSpace = SizedBox(height: 6);

  final List<Map<String, dynamic>> todayData = [
    DEVICE_CONFIG,
    DEVICE_CONFIG_OFF
  ];

  late Map<String, dynamic> todayValue = {
    'device': '0',
    'deviceOffline': '0',
    'onlineRate': '0'
  };

  final List<Map<String, dynamic>> todayEventData = [
    {'name': '报警设备数', 'key': 'alarmDevices', 'color': '#F03030'},
    {'name': '新增事件数', 'key': 'addEvents', 'color': '#3370FF'},
    {'name': '处理事件数', 'key': 'processedEvents', 'color': '#50C818'}
  ];

  late Map<String, dynamic> todayEventValue = {
    'alarmDevices': '0',
    'addEvents': '0',
    'processedEvents': '0'
  };

  late List alarmRuleStatTodayList = [];

  _initData() async {
    final _value =
        await getDeviceHomeData({'appId': widget.params?['key'] ?? ''});
    setState(() {
      todayValue = {
        'device': _value['deviceCount']?.toString(),
        'deviceOffline': _value['offlineCount']?.toString(),
        'onlineRate':
            ((_value['onlineRate'] ?? 0) * 100).toStringAsFixed(2).toString(),
      };

      todayEventValue = {
        'alarmDevices': _value['alarmDeviceCount']?.toString(),
        'addEvents': _value['increasedCount']?.toString(),
        'processedEvents': _value['handledCount']?.toString(),
      };

      alarmRuleStatTodayList = _value['alarmRuleStatTodayList'];
    });
  }

  _refresh(value) {
    _initData();
  }

  _onEventTypeClick(item) {
    pushNewScreenWithRouteSettings(
      context,
      screen: Events_list(
          params: {'appId': widget.params?['key']},
          formParams: {'eventTag': item['alarmTag']}),
      settings: RouteSettings(name: '/Events_list'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    ).then(_refresh);
  }

  @override
  Widget build(BuildContext context) {
    return PageRefresh(
      // extendBodyBehindAppBar: true,
      title: AppBarTitle(title: widget.title ?? ''),
      onRefresh: () async {
        _initData();
      },
      children: <Widget>[_deviceStatistics(), _events()],
    );
  }

  Widget _deviceStatistics() {
    return CardBase(
      title: '实时设备统计',
      onClick: () {
        pushNewScreenWithRouteSettings(
          context,
          screen: DeviceList(params: {'appId': widget.params?['key']}),
          settings: RouteSettings(name: '/DeviceList'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        ).then(_refresh);
      },
      child: Container(
        padding: EdgeInsets.only(left: 8, right: 8, top: 16, bottom: 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 3,
              child: _today(),
            ),
            Expanded(
                flex: 4,
                child: CardStatistics(list: todayData, data: todayValue))
          ],
        ),
      ),
    );
  }

  Widget _events() {
    return CardBase(
        title: '今日事件统计',
        padding: EdgeInsets.only(
            top: 32.sp, bottom: 8.sp, left: 32.sp, right: 32.sp),
        onClick: () {
          pushNewScreenWithRouteSettings(
            context,
            screen: Events_list(params: {'appId': widget.params?['key']}),
            settings: RouteSettings(name: '/DeviceList'),
            withNavBar: false, // OPTIONAL VALUE. True by default.
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          ).then(_refresh);
        },
        child: Column(
          children: [
            CardIndicatorStatistics(
                list: todayEventData, data: todayEventValue),
            Divider(
              color: hexToColor('#D9D9D9'),
            ),
            EventType(
              data: alarmRuleStatTodayList,
              onClick: _onEventTypeClick,
            ),
          ],
        ));
  }

  Widget _today() {
    final value = todayValue["onlineRate"];
    return CardPie(isFix: true, title: '设备在线率', value: '$value%');
  }
}
