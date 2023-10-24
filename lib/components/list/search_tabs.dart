import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../utils/color/color_hex.dart';

///  Created by pgli on 2023/4/21.
class SearchTabs extends StatefulWidget {
  SearchTabs({Key? key, this.tabs: const [], this.onTap})
      : super(key: key);

  final List<Map<String, dynamic>> tabs;
  final void Function(Map<String, dynamic>)? onTap;

  @override
  _SearchTabsState createState() => _SearchTabsState();
}

class _SearchTabsState extends State<SearchTabs> {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding:
            EdgeInsets.only(left: 16, right: 16, bottom: 4, top: 4),
        color: hexToColor('#F4F7FA'),
        child: DefaultTabController(
          length: widget.tabs.length,
          initialIndex: 0,
          child: TabBar(
            onTap: (v) {
              if (widget?.onTap != null) {
                widget?.onTap!(widget.tabs[v]);
              }
            },
            isScrollable: true,
            indicatorColor: hexToColor('#3370FF'),
            tabs: widget.tabs.asMap().entries.map<Widget>((item) {
              dynamic itemData = item.value;
              return Tab(
                text: itemData['label'],
              );
            }).toList(),
            labelColor: Colors.black,
            indicatorSize: TabBarIndicatorSize.label,
            labelPadding: EdgeInsets.only(left: 16.sp, right: 16.sp),
            indicator: UnderlineTabIndicator(
              borderSide: BorderSide(width: 2.0, color: hexToColor('#3370FF')),
              insets: EdgeInsets.symmetric(horizontal: 16.0),
            ),
          ),
        ));
  }
}
