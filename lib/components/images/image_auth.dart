import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/utils/color/color_hex.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import '../../pages/login/user_util.dart';
import '../../utils/index.dart';

Future<String> authImage(str) async {
  final headers = await UserUtil.getHeaders();
  final token = headers['token'];
  final tenant = headers['tenant'];
  return '$str?token=$token&tenant=$tenant';
}

///  Created by wangxiangyu on 2023/5/4.
class ImageAuth extends StatefulWidget {
  ImageAuth(
      {Key? key,
      this.size = 50.0,
      required this.imageUrl,
      this.height,
      this.width})
      : super(key: key);

  final double size;
  final double? width;
  final double? height;

  /// The target image that is displayed.
  final imageUrl;

  @override
  _ImageAuthState createState() => _ImageAuthState();
}

class _ImageAuthState extends State<ImageAuth> {
  late Map<String, String> _httpHeaders = {};
  late String _imageUrl = '';
  late String _imageKey;
  late int _cacheIndex;

  @override
  void initState() {
    super.initState();
    _init();
  }

  _init() async {
    if (mounted) {
      if (isTextEmpty(widget.imageUrl)) {
        _imageUrl = '';
        _imageKey = '';
        _cacheIndex = 0;
      } else {
        final _headers = await UserUtil.getHeaders();
        final _image = await authImage(widget.imageUrl);
        setState(() {
          _httpHeaders = _headers;
          _imageUrl = _image;
          _imageKey = widget.imageUrl;
          _cacheIndex = 0;
        });
      }
    }
  }

  @override
  void didUpdateWidget(ImageAuth oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.imageUrl != oldWidget.imageUrl) {
      _init();
    }
  }

  @override
  Widget build(BuildContext context) {
    return !isTextEmpty(_imageUrl)
        ? CachedNetworkImage(
            height: widget.height,
            width: widget.width,
            httpHeaders: _httpHeaders,
            imageUrl: _imageUrl,
            cacheKey: _imageKey,
            placeholder: (context, url) => SpinKitFadingCircle(
              color: hexToColor('#d9d9d9'),
              size: widget.size,
            ),
            errorWidget: (context, url, error) => _errorImage(forceLoad: true),
            fit: BoxFit.fitHeight,
          )
        : _errorImage();
  }

  Widget _errorImage({bool forceLoad = false}) {
    return Container(
      height: widget.height,
      padding: EdgeInsets.all(0.0),
      decoration: BoxDecoration(
          color: hexToColor('#F4F7FA'),
          boxShadow: forceLoad
              ? [
                  BoxShadow(
                    color: hexToColor('rgba(240, 48, 48, .2)'),
                    blurRadius: 4,
                    spreadRadius: 2,
                    offset: Offset(1, 1),
                  ),
                ]
              : [],
          borderRadius: BorderRadius.circular(8.w)),
      child: Center(
          child: forceLoad
              ? GestureDetector(
                  onTap: () async {
                    // 清除指定 URL 的缓存
                    await CachedNetworkImage.evictFromCache(_imageKey);
                    final _image = await authImage(widget.imageUrl);
                    setState(() {
                      _imageKey = '${_imageKey}${_cacheIndex}';
                      _imageUrl = _image;
                      _cacheIndex = _cacheIndex + 1;
                    });
                  },
                  child: Image.asset(
                      'asset/images/components/image_network_error.png'),
                )
              : Image.asset(
                  'asset/images/components/image_loading_empty.png',
                )),
    );
  }
}
