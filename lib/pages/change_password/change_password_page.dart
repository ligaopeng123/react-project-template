import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../constants/cache_constants.dart';
import '../../config/app_config.dart' show AppConfig;
import '../../utils/tool/sp_util.dart';
import './change_password.dart';

/// 闪屏页。
class ChangePassWordPage extends StatefulWidget {
  const ChangePassWordPage({Key? key}) : super(key: key);

  @override
  State<ChangePassWordPage> createState() => _ChangePassWordPageState();
}

class _ChangePassWordPageState extends State<ChangePassWordPage> {
  Widget? child;

  @override
  void initState() {
    super.initState();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: []);
    _initAsync();
  }

  @override
  void dispose() {
    super.dispose();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
        overlays: SystemUiOverlay.values);
  }

  _initAsync() async {
    var isNew = await SpUtil.getData<bool>(CacheConstants.guideKey,
        defValue: !AppConfig.isShowWelcome);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xffF4F7FA),
        appBar: AppBar(
          backgroundColor: Color(0xffF4F7FA),
          title: const Text('修改密码'),
        ),
        body: Container(
          padding: EdgeInsets.only(left: 12, right: 12, top: 12),
          // #F4F7FA
          child: Container(
            child: Card(child: ChangePasswordForm()),
          ),
        ));
  }
}
