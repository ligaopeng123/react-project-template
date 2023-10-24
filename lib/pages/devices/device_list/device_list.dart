import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/components/card/card_base.dart';
import 'package:smart_iot_app/pages/devices/devices_service.dart';
import 'package:smart_iot_app/pages/events/events_list/events_list.dart';
import '../../../components/list/scroll_loading_list.dart';
import '../../../components/list/search_bar.p.dart';
import '../../../components/list/search_panel.dart';
import '../../../components/list/search_tabs.dart';
import '../../../components/text/descriptions_item.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../components/device_search_form.dart';
import '../components/devices_status_tags.dart';

class DeviceList extends StatefulWidget {
  DeviceList({Key? key, this.params}) : super(key: key);

  final Map<String, dynamic>? params;

  @override
  _DeviceListState createState() => _DeviceListState();
}

class _DeviceListState extends State<DeviceList> {
  final GlobalKey<ScrollLoadingListState> tableKey =
      GlobalKey<ScrollLoadingListState>();

  late Map<String, dynamic> tabsParams = {'happenedToday': true};
  late Map<String, dynamic> formParams = {};

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future<Map<String, dynamic>> _request(params) async {
    final Map<String, dynamic> otherParams = {};
    otherParams.addAll(tabsParams);
    otherParams.addAll(widget.params ?? {});
    otherParams.addAll(formParams ?? {});
    final data = await getDeviceList(
        {'pageNum': params['current'], 'pageSize': params['pageSize']},
        otherParams);
    return data;
  }

  @override
  Widget build(BuildContext context) {
    return SearchPanel(
      title: '设备列表',
      searchBarStore: searchBarStore,
      searchForm: DeviceSearchForm(key: _formKey),
      onPressed: onPressed,
      onReset: onReset,
      body: Stack(
        fit: StackFit.expand,
        children: [
          Container(
            padding: EdgeInsets.only(
                left: 16.w,
                right: 16.w,
                top: ScreenUtil().setHeight(60),
                bottom: 16.h),
            child: buildListView(),
          ),
          Positioned(
            height: ScreenUtil().setHeight(60),
            top: 0,
            width: ScreenUtil().setWidth(720),
            child: buildTabs(),
          ),
        ],
      ),
    );
  }

  Widget buildTabs() {
    return SearchTabs(
      tabs: [
        {
          'label': '今日告警设备',
          'value': {'happenedToday': true}
        },
        {
          'label': '离线设备',
          'value': {'state': 'offline'}
        },
        {
          'label': '在线设备',
          'value': {'state': 'online'}
        },
        {'label': '全部设备'}
      ],
      onTap: (item) {
        setState(() {
          final Map<String, dynamic> params = item['value'] ?? {};
          tabsParams = params;
          tableKey.currentState?.reloadAndLoading();
        });
      },
    );
  }

  Widget buildListView() {
    return ScrollLoadingList(
        key: tableKey,
        request: _request,
        renderDetail: (item, index, data) {
          return Events_list(
              params: {'deviceId': item['id']}, title: item['name']);
        },
        renderItem: (item, index, data) {
          return CardBase(
            title: item['name'] ?? '',
            extra: DevicesStatusTags(
              status: item['state'],
            ),
            child: Container(
              child: Wrap(
                  direction: Axis.vertical,
                  alignment: WrapAlignment.start,
                  crossAxisAlignment: WrapCrossAlignment.start,
                  children: [
                    DescriptionsItem(label: '产品', value: item['productName']),
                    DescriptionsItem(label: 'IP地址', value: item['ip']),
                    DescriptionsItem(label: '区域', value: item['areaName']),
                  ]),
            ),
          );
        });
  }

  Map<String, dynamic> onPressed() {
    final _formParams = _formKey.currentState!.getValue();
    setState(() {
      formParams = _formParams['params'];
      tableKey.currentState?.reloadAndLoading();
    });
    return _formParams;
  }

  onReset() {
    _formKey.currentState!.reset();
  }

  final searchBarStore = SearchBarStore();
  GlobalKey<DeviceSearchFormState> _formKey =
      GlobalKey<DeviceSearchFormState>();
}
