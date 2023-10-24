import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import 'package:smart_iot_app/pages/server/provider/device_home.p.dart';
import '../../components/card/card_base.dart';
import '../../components/card/card_indicator_statistics.dart';
import 'components/app_server_table.dart';
import 'server_list.dart';
import 'server_service.dart';

///  Created by wangxiangyu on 2023/6/1.
class ServerHome extends StatefulWidget {
  ServerHome({Key? key}) : super(key: key);

  @override
  _ServerHomeState createState() => _ServerHomeState();
}

class _ServerHomeState extends State<ServerHome> {
  final homeStore = new ServerHomeStore();
  final List<Map<String, dynamic>> todayServerData = [
    {'name': '服务总数', 'key': 'allcount', 'color': '#3370FF'},
    {'name': '服务异常数', 'key': 'abnormalcount', 'color': '#F03030'},
    {'name': '正常运行数', 'key': 'normalcount', 'color': '#50C818'},
  ];

  late Map<String, dynamic> todayServerValue = {
    'allcount': '0',
    'normalcount': '0',
    'abnormalcount': '0',
  };

  @override
  void initState() {
    super.initState();
    _initData();
  }

  _initData() async {
    final res = await getServiceStatistics();
    setState(() {
      todayServerValue = res['overview'];
      homeStore.setList(res['statistics']);
    });
  }

  _refresh(value) {}

  @override
  Widget build(BuildContext context) {
    return PageRefresh(
        // extendBodyBehindDeviceBar: true,
        title: AppBarTitle(title: '服务监控'),
        onRefresh: () async {
          _initData();
        },
        children: [_buildBase(), _buildList()]);
  }

  _buildBase() {
    return CardBase(
        title: '总计',
        onClick: () {
          pushNewScreenWithRouteSettings(
            context,
            screen: ServerList(),
            settings: RouteSettings(name: '/ServerList'),
            withNavBar: false, // OPTIONAL VALUE. True by default.
            pageTransitionAnimation: PageTransitionAnimation.cupertino,
          ).then(_refresh);
        },
        child: CardIndicatorStatistics(
            list: todayServerData, data: todayServerValue));
  }

  _buildList() {
    return CardBase(
      title: '业务应用统计',
      child: Container(
        child: AppServerTable(homeStore: homeStore, refresh: _refresh),
      ),
    );
  }
}
