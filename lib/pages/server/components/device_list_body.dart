import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../components/card/card_base.dart';
import '../../../components/card/card_indicator_statistics.dart';
import '../../../components/list/scroll_loading_list.dart';
import '../../../components/list/search_tabs.dart';
import '../../../components/text/descriptions_item.dart';
import '../../devices/components/devices_status_tags.dart';
import '../server_service.dart';
import 'device_list_details.dart';

///  Created by wangxiangyu on 2023/6/2.
class DeviceListBody extends StatefulWidget {
  final Map<String, dynamic>? params;

  DeviceListBody({Key? key, this.params}) : super(key: key);

  @override
  _DeviceListBodyState createState() => _DeviceListBodyState();
}

class _DeviceListBodyState extends State<DeviceListBody> {
  var _params = {'type': 2, 'state': 2};
  final GlobalKey<ScrollLoadingListState> tableKey =
      GlobalKey<ScrollLoadingListState>();
  final List<Map<String, dynamic>> todayDeviceData = [
    {'name': '部署服务数', 'key': 'allCount', 'color': '#3370FF'},
    {'name': '异常服务数', 'key': 'abnormalCount', 'color': '#F03030'},
    {'name': '运行服务数', 'key': 'normalCount', 'color': '#50C818'},
  ];

  Future<Map<String, dynamic>> _request(listParams) async {
    late Map<String, dynamic> _currentParams = {};
    print(_params);
    _currentParams.addAll(widget.params ?? {});
    _currentParams.addAll(_params);
    _currentParams.addAll(listParams);
    _currentParams.addAll({'pageNum': listParams['current']});
    return await getServiceList(_currentParams);
  }

  @override
  void didUpdateWidget(covariant DeviceListBody oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.params != widget.params) {
      Future.delayed(Duration(milliseconds: 50), () {
        tableKey.currentState?.reloadAndLoading();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Container(
          padding: EdgeInsets.only(
              left: 16.w,
              right: 16.w,
              top: ScreenUtil().setHeight(60),
              bottom: 16.w),
          child: buildListView(),
        ),
        Positioned(
          height: ScreenUtil().setHeight(60),
          top: 0,
          width: ScreenUtil().setHeight(720),
          child: buildTabs(),
        ),
      ],
    );
  }

  buildTabs() {
    return SearchTabs(
      tabs: [
        {
          'label': '异常',
          'value': {'state': 2}
        },
        {
          'label': '正常',
          'value': {'state': 1}
        },
        {
          'label': '全部',
          'value': {'state': 0}
        }
      ],
      onTap: (item) {
        setState(() {
          _params.addAll(item['value'] ?? {});
          tableKey.currentState?.reloadAndLoading();
        });
      },
    );
  }

  buildListView() {
    return ScrollLoadingList(
        key: tableKey,
        request: _request,
        renderItem: (item, index, data) {
          return CardBase(
            title: item['name'] ?? '',
            extra: DevicesStatusTags(
              status: item['deviceState'] ?? 'notActive',
            ),
            child: Column(
              children: [
                DescriptionsItem(label: '区域', value: item['areaName'] ?? ''),
                Container(
                  child: CardIndicatorStatistics(
                      list: todayDeviceData, data: item),
                )
              ],
            ),
          );
        },
        renderDetail: (item, index, data) {
          return buildDetail(item);
        });
  }

  buildDetail(item) {
    return DeviceListDetails(params: item);
  }
}
