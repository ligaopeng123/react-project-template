import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/utils/index.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';
import '../../utils/tool/water_mark.dart';
import 'image_auth.dart';

import '../../utils/color/color_hex.dart';

///  Created by pgli on 2023/4/23.
class ImageListView extends StatefulWidget {
  ImageListView({Key? key, this.list: const [], this.index: 0})
      : super(key: key);

  final List list;
  final int index;

  @override
  _ImageListViewState createState() => _ImageListViewState();
}

class _ImageListViewState extends State<ImageListView> {
  int currentIndex = 0;
  int initialIndex = 0; //初始index
  int length = 0;
  String tokenStr = '';

  @override
  void initState() {
    currentIndex = widget.index;
    initialIndex = widget.index;
    length = widget.list.length;
    _initData();
    buildDarkWatermark(context);
    super.initState();
  }

  _initData() async {
    final _token = await authImage('');
    setState(() {
      tokenStr = _token;
    });
  }

  void onPageChanged(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: hexToColor('#F4F7FA'),
      appBar: AppBar(
        backgroundColor: hexToColor('#F4F7FA'),
        title: Text('${currentIndex + 1} / ${length}'),
        centerTitle: true,
        // leading: IconButton(
        //   icon: Icon(CupertinoIcons.chevron_back),
        //   onPressed: () {
        //     buildWhiteWatermark(context);
        //     // 在这里定义返回操作
        //     Navigator.of(context).pop();
        //   },
        // ),
      ),
      body: WillPopScope(
        onWillPop: () async {
          // 返回按钮事件处理逻辑
          buildWhiteWatermark(context);
          // 返回true表示允许返回操作，返回false表示阻止返回操作
          return true;
        },
        child: Container(
            decoration: BoxDecoration(
              color: Colors.black,
            ),
            constraints: BoxConstraints.expand(
              height: MediaQuery.of(context).size.height,
            ),
            child: isTextEmpty(tokenStr)
                ? SpinKitFadingCircle(
              color: hexToColor('#d9d9d9'),
            )
                : Stack(
              alignment: Alignment.bottomRight,
              children: <Widget>[
                PhotoViewGallery.builder(
                  scrollDirection: Axis.horizontal,
                  scrollPhysics: const BouncingScrollPhysics(),
                  builder: (BuildContext context, int index) {
                    return PhotoViewGalleryPageOptions(
                      imageProvider: CachedNetworkImageProvider(
                        widget.list[index]['image'] + tokenStr,
                        cacheKey: widget.list[index]['image'],
                      ),
                      initialScale: PhotoViewComputedScale.contained * 1,
                      heroAttributes: PhotoViewHeroAttributes(
                          tag: widget.list[index]['key']),
                    );
                  },
                  itemCount: widget.list.length,
                  // loadingChild: widget.loadingChild,
                  backgroundDecoration: BoxDecoration(
                    color: Colors.black,
                  ),
                  pageController: PageController(initialPage: initialIndex),
                  //点进去哪页默认就显示哪一页
                  onPageChanged: onPageChanged,
                ),
                Container(
                  padding: const EdgeInsets.all(10.0),
                  child: Text(
                    "Image ${currentIndex + 1}",
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 17.0,
                        decoration: null),
                  ),
                )
              ],
            )),
      ),
    );
  }
}
