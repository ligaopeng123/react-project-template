import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:bruno/bruno.dart';
import 'package:smart_iot_app/components/text/app_bar_title.dart';
import '../../../components/card/card_base.dart';
import '../../../components/list/scroll_loading_list.dart';
import '../../../components/list/search_tabs.dart';
import '../../../components/text/descriptions_item.dart';
import '../../devices/components/devices_status_tags.dart';
import '../server_service.dart';

///  Created by wangxiangyu on 2023/6/2.
class ServerListDetails extends StatefulWidget {
  final Map<String, dynamic>? params;

  ServerListDetails({Key? key, this.params}) : super(key: key);

  @override
  _ServerListDetailsState createState() => _ServerListDetailsState();
}

class _ServerListDetailsState extends State<ServerListDetails> {
  var _params = {'type': 1, 'state': 2};
  final GlobalKey<ScrollLoadingListState> tableKey =
      GlobalKey<ScrollLoadingListState>();

  Future<Map<String, dynamic>> _request(params) async {
    late Map<String, dynamic> _currentParams = {};
    _currentParams.addAll(params);
    _currentParams.addAll(_params);
    _currentParams.addAll({"idOrServiceName": (widget.params ?? {})['name']});
    _currentParams.addAll({'pageNum': params['current']});
    return await getServiceDetailsList(_currentParams);
  }

  @override
  Widget build(BuildContext context) {
    return PageCard(
        title: AppBarTitle(title: (widget.params ?? {})['name'] ?? ''),
        body: Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height -
                MediaQuery.of(context).padding.top -
                70, // 设置最大高度为200像素
          ),
          child: Stack(
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
          ),
        ));
  }

  buildListView() {
    return ScrollLoadingList(
        key: tableKey,
        request: _request,
        renderItem: (item, index, data) {
          return CardBase(
            title: item['name'] ?? '',
            extra: DevicesStatusTags(
              status: item['state'] ?? 'notActive',
            ),
            child: Column(
              children: [
                DescriptionsItem(label: '区域', value: item['areaName'] ?? ''),
                DescriptionsItem(
                    label: '最近异常时间', value: item['abnormalTime'] ?? ''),
                DescriptionsItem(
                    label: '最近异常描述', value: item['description'] ?? ''),
              ],
            ),
          );
        });
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
}
