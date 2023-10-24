import 'package:bruno/bruno.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:smart_iot_app/pages/change_password/change_password_page.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import '../../../../components/update_app/check_app_version.dart';
import '../../../../utils/color/color_hex.dart';
import '../../../../utils/tool/tips_util.dart';
import '../../../login/user_util.dart' show UserUtil;
import 'package:package_info_plus/package_info_plus.dart';

///  Created by wangxiangyu on 2023/5/16.
class MyAllList extends StatefulWidget {
  MyAllList({Key? key}) : super(key: key);

  @override
  _MyAllListState createState() => _MyAllListState();
}

const List<Map<String, dynamic>> ListData = [
  {
    'image': 'asset/images/login/password_icon.png',
    'title': '设置密码',
    'key': 'password'
  },
  {
    'title': '退出登录',
    'image': 'asset/images/login/logout_icon.png',
    'key': 'logout',
  },
  {'title': '关于', 'image': 'asset/images/login/about.png', 'key': 'about'},
];

class _MyAllListState extends State<MyAllList> {
  late Map<String, String> _values = {
    'password': '',
    'logout': '',
    'about': '',
  };

  late Map<String, bool> _tags = {
    'password': false,
    'logout': false,
    'about': false,
  };

  @override
  void initState() {
    _initAbout();
  }

  _initAbout() async {
    PackageInfo packageInfo = await PackageInfo.fromPlatform();
    var appVersion = await getAppVersion();
    setState(() {
      final version = kIsWeb ? appVersion.webVersion : packageInfo.version;
      _values = {
        'password': '',
        'logout': '',
        'about': '版本 $version',
      };

      _tags = {
        'password': false,
        'logout': false,
        'about': kIsWeb ? appVersion.webUpgrade : appVersion.upgrade,
      };
    });
  }

  void _upgrade() async {
    if (kIsWeb) {
    } else {
      var appVersion = await getAppVersion();
      if (appVersion.upgrade) {
        checkAppVersion(seconds: 2);
        return;
      }
    }
    Tips.info('已经是最新版本了');
  }

  void _showAlertDialog(BuildContext context) {
    showCupertinoModalPopup<void>(
      context: context,
      builder: (BuildContext context) => CupertinoAlertDialog(
        title: const Text('退出后不删除任何历史数据， 请确认是否退'),
        // content: const Text('Proceed with destructive action?'),
        actions: <CupertinoDialogAction>[
          CupertinoDialogAction(
            /// This parameter indicates this action is the default,
            /// and turns the action's text to bold text.
            isDefaultAction: true,
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('取消'),
          ),
          CupertinoDialogAction(
            /// This parameter indicates the action would perform
            /// a destructive action such as deletion, and turns
            /// the action's text color to red.
            isDestructiveAction: true,
            onPressed: () async {
              await UserUtil.cleanUserInfo();
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/login',
                (Route<dynamic> route) => false,
              );
            },
            child: const Text('退出登录'),
          ),
        ],
      ),
    );
  }

  void _onTap(item, context) {
    switch (item['key']) {
      case 'logout':
        _showAlertDialog(context);
        break;
      case 'password':
        pushNewScreenWithRouteSettings(
          context,
          screen: ChangePassWordPage(),
          settings: RouteSettings(name: '/changePassword'),
          withNavBar: false, // OPTIONAL VALUE. True by default.
          pageTransitionAnimation: PageTransitionAnimation.cupertino,
        );
        break;
      case 'about':
        _upgrade();
        break;
      default:
      // changePassword
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      scrollDirection: Axis.vertical,
      separatorBuilder: (BuildContext context, int index) => Container(
        height: 16,
        color: Colors.transparent,
      ),
      itemCount: 1,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(4),
          ),
          // height: 44,
          child: Column(
            children: ListData.asMap().entries.map<Widget>((item) {
              dynamic v = item.value;
              int index = item.key;
              return Column(
                children: [
                  ListTile(
                    visualDensity: VisualDensity(vertical: -4),
                    // Divider(
                    //   height: kIsWeb ? 0.5 : 0,
                    //   indent: 64,
                    // )
                    title: Text(
                      ListData[index]['title'],
                      style: TextStyle(fontSize: 16),
                    ),
                    // subtitle: Text(list[index].subtitle),
                    leading: Image.asset(
                      v['image'],
                      fit: BoxFit.cover,
                      width: 24,
                      height: 24,
                    ),
                    minLeadingWidth: 36,
                    horizontalTitleGap: 0,
                    trailing: Container(
                      width: 150,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          if (_tags[v['key']] == true)
                            BrnStateTag(
                              tagText: 'new',
                              tagState: TagState.failed,
                            ),
                          if (_values[v['key']] != '')
                            Text(_values[v['key']] ?? '',
                                style: TextStyle(fontSize: 16)),
                          Icon(
                            CupertinoIcons.chevron_right,
                            size: 16,
                          )
                        ],
                      ),
                    ),
                    onTap: () {
                      _onTap(ListData[index], context);
                    },
                  ),
                  if (index + 1 < ListData.length)
                    Divider(
                      height: kIsWeb ? 0.5 : 0,
                      indent: 48,
                      endIndent: 16,
                      color: hexToColor('#D9D9D9'),
                    ),
                ],
              );
            }).toList(),
          ),
        );
      },
    );
  }
}
