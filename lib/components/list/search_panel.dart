import 'package:bruno/bruno.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
// import 'package:material_floating_search_bar/material_floating_search_bar.dart';
import 'package:smart_iot_app/components/list/animation_search_bar.dart';
import 'package:smart_iot_app/utils/index.dart';

import '../../utils/color/color_hex.dart';
import '../text/app_bar_title.dart';
import 'search_bar.p.dart';
import 'search_drawer.dart';

///  Created by wangxiangyu on 2023/4/28.
class SearchPanel extends StatefulWidget {
  SearchPanel(
      {Key? key,
      required this.body,
      required this.searchForm,
      this.title,
      this.onPressed,
      this.onReset,
      this.searchBarStore,
      this.initialValues})
      : super(key: key);

  final SearchBarStore? searchBarStore;
  final Widget body;
  final Widget searchForm;
  final String? title;
  final Map? initialValues;

  /// 点击确定事件
  final Map<String, dynamic> Function()? onPressed;

  /// 点击重置事件
  final void Function()? onReset;

  @override
  _SearchPanelState createState() => _SearchPanelState();
}

class _SearchPanelState extends State<SearchPanel> {
  // FloatingSearchBarController _controller = new FloatingSearchBarController();
  TextEditingController controller = TextEditingController();
  late String paramsStr = '';

  final GlobalKey<InnerDrawerState> _innerDrawerKey =
      GlobalKey<InnerDrawerState>();

  void _toggle() {
    // EasyThrottle.throttle(
    //     'my-throttler', // <-- An ID for this particular throttler
    //     Duration(milliseconds: 500), // <-- The throttle duration
    //     () {
    //   _innerDrawerKey.currentState?.toggle(
    //       // direction is optional
    //       // if not set, the last direction will be used
    //       //InnerDrawerDirection.start OR InnerDrawerDirection.end
    //       direction: InnerDrawerDirection.end);
    // }, // <-- The target method
    //     onAfter:
    //         () {} // <-- Optional callback, called after the duration has passed
    //     );
    _innerDrawerKey.currentState?.toggle(
        // direction is optional
        // if not set, the last direction will be used
        //InnerDrawerDirection.start OR InnerDrawerDirection.end
        direction: InnerDrawerDirection.end);
  }

  @override
  void initState() {
    super.initState();
    if (widget.initialValues != null && !(widget.initialValues ?? {}).isEmpty) {
      setState(() {
        paramsStr = 'paramsStr';
      });
    }
  }

  _afterClose() {
    final _formParams = widget.onPressed!();
    setState(() {
      paramsStr = _formParams['paramsStr'] ?? '';
    });
  }

  @override // AbsorbPointer
  Widget build(BuildContext context) {
    return InnerDrawer(
        key: _innerDrawerKey,
        onTapClose: true,
        swipe: true,
        proportionalChildArea: true,
        borderRadius: 4,
        offset: const IDOffset.horizontal(0.85),
        leftAnimationType: InnerDrawerAnimation.static,
        rightAnimationType: InnerDrawerAnimation.quadratic,
        backgroundDecoration: BoxDecoration(color: hexToColor('#F4F7FA')),
        // default  Theme.of(context).backgroundColor
        innerDrawerCallback: (a) => {
              if (a == false) {_afterClose()}
            },
        rightChild: _buildContent(context),
        scaffold: Scaffold(
          backgroundColor: hexToColor('#F4F7FA'),
          resizeToAvoidBottomInset: false,
          appBar: PreferredSize(
              preferredSize: const Size(double.infinity, 60),
              child: SafeArea(
                  child: Container(
                decoration: BoxDecoration(color: hexToColor('#F4F7FA')),
                alignment: Alignment.center,
                child: _buildSearch(context),
              ))),
          body: widget.body,
        ));
  }

  Widget _buildSearch(context) {
    return AnimationSearchBar(
        hintText: '搜索...',
        isShowSearchInput: false,
        backIconColor: Colors.black,
        centerTitle: widget.title ?? '',
        centerTitleStyle: AppBarTitleStyle,
        onChanged: (text) => debugPrint(text),
        onSearchPressed: (s) => {_toggle()},
        searchTextEditingController: controller,
        searchIconColor: isTextEmpty(paramsStr)
            ? Colors.black.withOpacity(.7)
            : hexToColor('#3370FF'),
        horizontalPadding: 5);
  }

  Widget _buildContent(BuildContext context) {
    final double bthHeight = 60;
    final double topVal = 16;
    return Scaffold(
        backgroundColor: hexToColor('#ffffff'),
        resizeToAvoidBottomInset: false,
        body: Container(
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
          child: Column(children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: IconButton(
                    iconSize: 28,
                    alignment: Alignment.centerLeft,
                    icon: Icon(CupertinoIcons.chevron_back),
                    onPressed: () {
                      _toggle();
                    },
                  ),
                ),
                // Text(paramsStr)
              ],
            ),
            Container(
              padding:
                  EdgeInsets.only(left: 16, right: 16, bottom: 16, top: 0.0),
              child: Column(
                children: [
                  Container(
                    height: MediaQuery.of(context).size.height -
                        MediaQuery.of(context).padding.top -
                        bthHeight -
                        28 -
                        topVal * 2,
                    child: SingleChildScrollView(
                      child: widget.searchForm,
                    ),
                  ),
                  Center(
                    child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.only(top: topVal),
                        height: bthHeight,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Expanded(
                              child: BrnSmallOutlineButton(
                                title: '重置',
                                onTap: () {
                                  setState(() {
                                    paramsStr = '';
                                  });
                                  widget.onReset!();
                                },
                              ),
                            ),
                            SizedBox(width: 20),
                            Expanded(
                              child: BrnSmallMainButton(
                                title: '确定',
                                onTap: () {
                                  _toggle();
                                },
                              ),
                            )
                          ],
                        )),
                  ),
                ],
              ),
            )
          ]),
        ));
  }
}
