import 'package:animations/animations.dart';
import 'package:easy_refresh/easy_refresh.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:smart_iot_app/components/list/search_loading.dart';
import 'EasyRefreshHeader.dart';
import 'list_item_details.dart';

class _CIProperties {
  final String name;
  bool disable = false;
  bool clamping = false;
  bool background = false;
  MainAxisAlignment alignment;
  bool message = true;
  bool text = true;
  bool infinite;
  bool immediately = false;

  _CIProperties({
    required this.name,
    required this.alignment,
    required this.infinite,
  });
}

///  Created by pgli on 2023/4/21.
class ScrollLoadingList extends StatefulWidget {
  ScrollLoadingList({
    Key? key,
    this.itemHeight,
    this.request,
    this.renderItem,
    this.renderDetail,
  }) : super(key: key);

  final double? itemHeight;

  /// 获取数据 List<Map<String, dynamic>>
  final Future<Map<String, dynamic>> Function(Map<String, dynamic> params)?
      request;

  /// 获取数据 List<Map<String, dynamic>>
  final Widget Function(dynamic item, int index, List<dynamic> data)?
      renderItem;

  /// 获取数据 List<Map<String, dynamic>>
  final Widget Function(dynamic item, int index, List<dynamic> data)?
      renderDetail;

  @override
  ScrollLoadingListState createState() => ScrollLoadingListState();
}

class ScrollLoadingListState extends State<ScrollLoadingList> {
  ContainerTransitionType _transitionType = ContainerTransitionType.fade;

  @override
  Widget build(BuildContext context) {
    return buildListView();
  }

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);
    _controller = EasyRefreshController(
      controlFinishRefresh: true,
      controlFinishLoad: true,
    );

    getData(defaultParams);
    Future.delayed(Duration(milliseconds: 10), () {
      SearchLoading.show(context);
    });
  }

  @override
  void dispose() {
    _scrollController.removeListener(_scrollListener);
    super.dispose();
    _controller.dispose();
  }

  late int currentIndex = 1;
  final defaultParams = {'current': 1, 'pageSize': 20};

  /**
   * 获取数据
   */
  getData(Map<String, dynamic> params, {String type = ''}) async {
    if (widget.request != null) {
      final _dataSource = await widget.request!(params);
      final List<dynamic> data = _dataSource['data'];
      final List<dynamic> oldDataList = dataList;
      if (type == 'reload') {
        setState(() {
          dataSource = _dataSource;
          dataList = data;
        });
        // 滚动到第一行
        _scrollController.animateTo(
          0.0,
          duration: Duration(milliseconds: 100),
          curve: Curves.easeInOut,
        );
        _controller.finishRefresh();
        _controller.resetFooter();
        // final v = MediaQuery.of(context).padding.top;
        // _scrollController.jumpTo(MediaQuery.of(context).padding.top);
      } else {
        oldDataList.addAll(data);
        setState(() {
          dataSource = _dataSource;
          dataList = oldDataList;
        });
      }
      handleLoad();
    }
  }

  /**
   * 加载后的处理
   */
  handleLoad() {
    Future.delayed(const Duration(milliseconds: 200)).then((value) {
      _controller.finishLoad(currentIndex * 20 >= dataSource['total']
          ? IndicatorResult.noMore
          : IndicatorResult.success);
    });
    SearchLoading.dismiss(context);
  }

  /**
   * 重新加载数据
   */
  reload([Map<String, dynamic>? params]) {
    setState(() {
      currentIndex = 1;
      final Map<String, dynamic> currentParams = {};
      currentParams.addAll(defaultParams);
      currentParams.addAll(params ?? {});
      getData(currentParams, type: 'reload');
    });
  }

  reloadAndLoading([Map<String, dynamic>? params]) {
    SearchLoading.show(context);
    reload(params);
  }

  getNext([Map<String, dynamic>? params]) {
    setState(() {
      currentIndex = currentIndex + 1;
      getData({'current': currentIndex, 'pageSize': 20}, type: 'next');
    });
  }

  /**
   * 是否有详情模块
   */
  bool get hasDetail {
    //dart中定义一个getter
    return widget.renderDetail != null;
  }

  late Map<String, dynamic> dataSource = {'total': 0, 'data': []};
  late List<dynamic> dataList = [];

  /**
   * 创建滚动list
   */
  final _scrollController = ScrollController();

  void _scrollListener() {
    if (_scrollController.offset >=
            _scrollController.position.maxScrollExtent &&
        !_scrollController.position.outOfRange) {
      // 加载更多数据 条数超出时给出提示
    }
  }

  late EasyRefreshController _controller;

  final _CIProperties _footerProperties = _CIProperties(
    name: 'Footer',
    alignment: MainAxisAlignment.start,
    infinite: true,
  );

  Widget buildListView() {
    return EasyRefresh(
      controller: _controller,
      header: EasyRefreshClassicHeader,
      footer: EasyRefreshClassicFooter,
      onRefresh: () async {
        if (!mounted) {
          return;
        }
        reload();
      },
      onLoad: () async {
        if (!mounted) {
          return;
        }
        print(currentIndex * 20 < dataSource['total']);
        if (currentIndex * 20 < dataSource['total']) {
          getNext();
        } else {
          handleLoad();
        }
      },
      // const FooterLocator.sliver(),
      child: ListView.builder(
          controller: _scrollController,
          itemCount: dataList.length,
          // itemExtent: widget.itemHeight,
          /// 强制高度为50.0
          padding: EdgeInsets.zero,
          itemBuilder: (BuildContext context, int index) {
            return Container(
                padding: EdgeInsets.only(bottom: 4.w),
                child: hasDetail
                    ? OpenListDetailsWrapper(
                        transitionType: _transitionType,
                        openBuilder: (context, openContainer) {
                          return widget.renderDetail!(
                              dataList[index], index, dataList);
                        },
                        closedBuilder: (context, openContainer) {
                          return ListItem(
                              openContainer: openContainer,
                              height: widget.itemHeight,
                              child: widget.renderItem != null
                                  ? widget.renderItem!(
                                      dataList[index], index, dataList)
                                  : Container(child: Text('$index')));
                        },
                      )
                    : widget.renderItem != null
                        ? widget.renderItem!(dataList[index], index, dataList)
                        : Container(child: Text('$index')));
          }),
    );
  }
}
