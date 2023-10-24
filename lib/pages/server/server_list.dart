import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';

import '../../components/list/animation_search_bar.dart';
import '../../utils/color/color_hex.dart';
import '../../utils/index.dart';
import 'components/device_list_body.dart';
import 'components/server_list_body.dart';

///  Created by wangxiangyu on 2023/6/1.
class ServerList extends StatefulWidget {
  ServerList({Key? key, this.params}) : super(key: key);

  final Map<String, dynamic>? params;

  @override
  _ServerListState createState() => _ServerListState();
}

class _ServerListState extends State<ServerList> with TickerProviderStateMixin {
  TextEditingController controller = TextEditingController();
  late int _index = 0;
  var _name = '';
  Map<String, dynamic> _params = {};

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    setState(() {
      _params = getParams();
    });
  }

  getParams() {
    final Map<String, dynamic> _currentParams = {};
    _currentParams.addAll(widget.params ?? {});
    if (!isTextEmpty(_name)) {
      _currentParams.addAll({'name': _name});
    }
    return _currentParams;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: hexToColor('#F4F7FA'),
      resizeToAvoidBottomInset: false,
      appBar: _createTabAndSearch(),
      body: _index == 0
          ? DeviceListBody(params: _params)
          : ServerListBody(params: _params),
    );
  }

  _toggle(s) {
  }

  _createTabAndSearch() {
    return PreferredSize(
        preferredSize: const Size(double.infinity, 60),
        child: SafeArea(
            child: Container(
          decoration: BoxDecoration(color: hexToColor('#F4F7FA')),
          alignment: Alignment.center,
          child: AnimationSearchBar(
              hintText: '搜索...',
              backIconColor: Colors.black,
              centerContent: Container(
                width: 200,
                child: _createTabs(),
              ),
              onChanged: (s) => {_toggle(s)},
              onSearch: (text) {
                setState(() {
                  _name = text;
                  _params = getParams();
                });
              },
              onClose: () {
                setState(() {
                  _name = '';
                  _params = getParams();
                });
              },
              onSearchPressed: (s) => {_toggle(s)},
              searchTextEditingController: controller,
              horizontalPadding: 5),
        )));
  }

  _createTabs() {
    var tabs = <BadgeTab>[];
    tabs.add(BadgeTab(text: "设备维度"));
    tabs.add(BadgeTab(text: "服务维度"));
    TabController tabController =
        TabController(initialIndex: _index, length: tabs.length, vsync: this);
    return BrnTabBar(
      backgroundcolor: Colors.transparent,
      controller: tabController,
      tabs: tabs,
      onTap: (state, index) {
        state.refreshBadgeState(index);
        Future.delayed(Duration(milliseconds: 200), () {
          setState(() {
            _index = index;
          });
        });
      },
    );
  }
}
