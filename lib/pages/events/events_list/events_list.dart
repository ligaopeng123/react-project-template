import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../components/card/card_base.dart';
import '../../../components/images/image_auth.dart';
import '../../../components/list/search_bar.p.dart';
import '../../../components/list/scroll_loading_list.dart';
import '../../../components/list/search_panel.dart';
import '../../../components/list/search_tabs.dart';
import '../../../components/text/descriptions_item.dart';
import '../components/event_list_details.dart';
import '../components/event_search_form.dart';
import '../events_service.dart';
import '../components/event_handle_status_tags.dart';
import '../components/event_level_tags.dart';

class Events_list extends StatefulWidget {
  Events_list({Key? key, this.params, this.formParams, this.title})
      : super(key: key);

  final String? title;
  final Map<String, dynamic>? params;
  final Map<String, dynamic>? formParams;

  @override
  _Events_listState createState() => _Events_listState();
}

class _Events_listState extends State<Events_list> {
  late Map<String, dynamic> tabsParams = {'happenedToday': true};
  late Map<String, dynamic> formParams = {};

  @override
  void initState() {
    super.initState();
    _initParams();
  }

  _initParams() {
    formParams = widget.formParams ?? {};
  }

  @override
  Widget build(BuildContext context) {
    return SearchPanel(
      title: widget.title ?? '事件列表',
      searchBarStore: searchBarStore,
      initialValues: widget.formParams,
      searchForm:
          EventSearchForm(key: _formKey, initialValues: widget.formParams),
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
    );
  }

  Widget buildTabs() {
    return SearchTabs(
      tabs: [
        {
          'label': '当日新增',
          'value': {'happenedToday': true}
        },
        // {
        //   'label': '当日处理',
        //   'value': {'handledToday': true}
        // },
        {
          'label': '未处理',
          'value': {'handleStatus': 0}
        },
        {'label': '全部'}
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

  Future<Map<String, dynamic>> _request(params) async {
    final Map<String, dynamic> otherParams = {};
    otherParams.addAll(tabsParams);
    otherParams.addAll(widget.params ?? {});
    otherParams.addAll(formParams ?? {});
    final data = await getEventList(
        {'pageNum': params['current'], 'pageSize': params['pageSize']},
        otherParams);
    return data;
  }

  final GlobalKey<ScrollLoadingListState> tableKey =
      GlobalKey<ScrollLoadingListState>();

  Widget buildListView() {
    return ScrollLoadingList(
        key: tableKey,
        request: _request,
        renderItem: (item, index, data) {
          return CardBase(
            title: item['deviceName'] ?? '',
            child: Container(
              child: Column(children: [
                Container(
                    child: Row(children: [
                  Expanded(
                    flex: 1,
                    child: Wrap(
                      children: [
                        DescriptionsItem(label: '类型', value: item['eventName']),
                        DescriptionsItem(
                            label: '状态',
                            value: EventHandleStatusTags(
                                status: item['handleStatus'])),
                        DescriptionsItem(
                            label: '等级',
                            value: EventLevelTags(
                              eventLevel: item['eventLevel'],
                            )),
                      ],
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Container(
                        padding: EdgeInsets.only(
                          top: 8,
                        ),
                        child: ImageAuth(
                          imageUrl: item['eventPicture'],
                          height: 70,
                        )),
                  )
                ])),
                Container(
                    child: Column(children: [
                  DescriptionsItem(label: '时间', value: item['happenTime']),
                  DescriptionsItem(label: '区域', value: item['areaName']),
                ])),
              ]),
            ),
          );
        },
        renderDetail: (item, index, data) {
          return buildDetail(item);
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
  GlobalKey<EventSearchFormState> _formKey = GlobalKey<EventSearchFormState>();

  Widget buildDetail(item) {
    return EventListDetail(detailsData: item);
  }
}
