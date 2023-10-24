import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../components/text/app_bar_title.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import '../../../components/card/card_base.dart';
import '../../../components/card/card_pie.dart';
import '../../../components/card/card_statistics.dart';
import '../../../components/images/image_auth.dart';
import '../../../utils/color/color_hex.dart';
import '../../devices/device.dart';
import '../../events/events.dart';
import 'dashboard_service.dart';

class Dashboard extends StatefulWidget {
  Dashboard({Key? key}) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  @override
  void initState() {
    super.initState();
    _initData();
  }

  final String home_bg = 'asset/images/home/home_bg.png';
  final sizedBoxSpace = SizedBox(height: 6);
  final labelColor = Color.fromRGBO(0, 0, 0, 0.6);
  late List<Map<String, dynamic>> appList = [];

  final List<Map<String, dynamic>> appList2 = [
    {
      'name': '设备管理',
      'icon': 'asset/images/home/device_icon.png',
      'key': 'device'
    },
    {
      'name': '事件中心',
      'icon': 'asset/images/home/event_icon.png',
      'key': 'events'
    }
  ];

  final List<Map<String, dynamic>> todayData = [
    DEVICE_CONFIG,
    DEVICE_CONFIG_OFF,
    EVENT_CONFIG
  ];

  late Map<String, dynamic> todayValue = {
    'device': '0',
    'deviceOffline': '0',
    'server': '0',
    'onlineRate': '0',
  };

  _initData() async {
    final Map<String, dynamic> _dataList = {
      "deviceTotal": 100,
      "offlineTotal": 20,
      "eventTotal": 30,
      "onlineRate": 0.8,
    };
    setState(() {
      todayValue = {
        'device': _dataList['deviceTotal']?.toString(),
        'deviceOffline': _dataList['offlineTotal']?.toString(),
        'server': _dataList['eventTotal']?.toString(),
        'onlineRate':
            ((_dataList['onlineRate'] ?? 0) * 100).toStringAsFixed(2).toString()
      };
    });
  }

  _refresh(value) {
    _initData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      // extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(home_bg),
                fit: BoxFit.cover,
              ),
            ),
          ),
          PullDownRefresh(
            onRefresh: () async {
              _refresh(null);
            },
            children: [
              AppBar(
                backgroundColor: Colors.transparent,
                automaticallyImplyLeading: false,
                elevation: 0,
                title: AppBarTitle(title: '首页'),
                centerTitle: true,
              ),
              _app(),
              _appList2(),
            ],
          ),
        ],
      ),
    );
  }

  Widget _app() {
    return CardBase(
      title: '今日实时数据',
      onClick: () {
        pushNewScreenWithRouteSettings(
          context,
          screen: Device(),
          settings: RouteSettings(name: '/Device'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        ).then(_refresh);
      },
      child: Container(
        padding: EdgeInsets.only(left: 16, right: 16, top: 16),
        constraints: BoxConstraints(
            maxHeight: ScreenUtil().setHeight(450),
            minWidth: ScreenUtil().setHeight(720)),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 3,
              child: _today(),
            ),
            Expanded(
              flex: 4,
              child: CardStatistics(list: todayData, data: todayValue),
            ),
          ],
        ),
      ),
    );
  }

  Widget _today() {
    final _value = todayValue['onlineRate'];
    return Container(
      width: 150,
      height: 150,
      child: Center(
        child: CardPie(
          isFix: true,
          title: '设备在线率',
          value: '${_value}%',
        ),
      ),
    );
  }

  Widget _appList2() {
    return CardBase(
      title: '统计列表',
      // onTitleClick: () {},
      child: Container(
        child: Wrap(
          direction: Axis.horizontal,
          children: _appListItem(appList2),
        ),
      ),
    );
  }

  onAppClick(itemData) {
    final String key = itemData['key'];
    switch (key) {
      case 'events':
        pushNewScreenWithRouteSettings(
          context,
          screen: Events(),
          settings: RouteSettings(name: '/events'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        ).then(_refresh);
        break;
      case 'device':
        pushNewScreenWithRouteSettings(
          context,
          screen: Device(),
          settings: RouteSettings(name: '/device'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        ).then(_refresh);
        break;
      default:
        if (key != null) {

        }
        break;
    }
  }

  List<Widget> _appListItem(list) {
    try {
      return list.asMap().entries.map<Widget>((item) {
        dynamic itemData = item.value;
        return GestureDetector(
          onTap: () {
            // 处理点击事件的代码
            onAppClick(itemData);
          },
          child: Container(
            width: (MediaQuery.of(context).size.width - 80) / 3,
            // constraints: BoxConstraints(
            //   maxWidth: (MediaQuery.of(context).size.width - 64) / 4
            // ),
            padding: EdgeInsets.only(left: 12, right: 12, top: 16),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  itemData['icon']?.startsWith('http')
                      ? ImageAuth(
                          imageUrl: itemData['icon'],
                          width: 32,
                          height: 32,
                        )
                      // Image.network(itemData['icon'], width: 28)
                      : Image.asset(itemData['icon'], width: 28),
                  Container(
                    padding: EdgeInsets.only(top: 4),
                    child: Text(
                      itemData['name'],
                      style: TextStyle(color: hexToColor('#000000')),
                      overflow: TextOverflow.ellipsis, // 使用省略号(...)截断文字
                      maxLines: 1,
                    ),
                  )
                ]),
          ),
        );
      }).toList();
    } catch (e) {
      throw Exception('appBottomBar数据缺少参数、或字段类型不匹配, errorMsg:$e');
    }
  }
}
