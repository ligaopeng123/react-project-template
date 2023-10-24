import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import 'package:smart_iot_app/pages/events/components/event_type.dart';
import '../../../components/card/card_base.dart';
import '../../../components/card/card_indicator_statistics.dart';
import '../../../utils/color/color_hex.dart';
import '../components/app_events_table.dart';
import '../events_list/events_list.dart';
import '../events_service.dart';
import './provider/events_home.p.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';

class Events_home extends StatefulWidget {
  Events_home({Key? key}) : super(key: key);

  @override
  _Events_homeState createState() => _Events_homeState();
}

class _Events_homeState extends State<Events_home> {
  @override
  void initState() {
    super.initState();
    initData();
  }

  final sizedBoxSpace = SizedBox(height: 6);

  final List<Map<String, dynamic>> todayEventData = [
    {'name': '报警设备数', 'key': 'alarmDevice', 'color': '#F03030'},
    {'name': '新增事件数', 'key': 'addEvents', 'color': '#3370FF'},
    {'name': '处理事件数', 'key': 'processedEvents', 'color': '#50C818'}
  ];

  late Map<String, dynamic> todayEventValue = {
    'alarmDevice': '0',
    'addEvents': '0',
    'processedEvents': '0'
  };

  late List alarmRuleStatTodayList = [];

  final homeStore = new Events_homeStore();

  initData() async {
    final _data = await getEventHome();
    setState(() {
      todayEventValue = {
        'alarmDevice': _data['alarmDeviceCount']?.toString() ?? '0',
        'addEvents': _data['increasedCount']?.toString() ?? '0',
        'processedEvents': _data['handledCount']?.toString() ?? '0'
      };
      final List<dynamic> appEventStatTodayList =
          _data['appEventStatTodayList'];
      alarmRuleStatTodayList = _data['alarmRuleStatTodayList'];
      homeStore.setList(appEventStatTodayList);
    });
  }

  _refresh(value) {
    initData();
  }

  @override
  Widget build(BuildContext context) {
    return PageRefresh(
      // extendBodyBehindAppBar: true,
      title: AppBarTitle(title: '事件概览'),
      onRefresh: () async {
        initData();
      },
      children: <Widget>[_events(), _appStatistics()],
    );
  }

  @override
  void dispose() {
    super.dispose();
    homeStore.dispose();
  }

  _onEventTypeClick(item) {
    pushNewScreenWithRouteSettings(
      context,
      screen: Events_list(formParams: {'eventTag': item['alarmTag']}),
      settings: RouteSettings(name: '/Events_list'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    ).then(_refresh);
  }

  Widget _events() {
    return CardBase(
        title: '今日事件统计',
        padding: EdgeInsets.only(
            top: 32.sp, bottom: 8.sp, left: 32.sp, right: 32.sp),
        onClick: () {
          pushNewScreenWithRouteSettings(
            context,
            screen: Events_list(),
            settings: RouteSettings(name: '/Events_list'),
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

  Widget _appStatistics() {
    return CardBase(
      title: '业务应用统计',
      child: Container(
        child: AppEventsTable(homeStore: homeStore, refresh: _refresh),
      ),
    );
  }
}
