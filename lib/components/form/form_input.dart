import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'form_item.dart';

///  Created by wangxiangyu on 2023/4/28.
class FormInput extends StatefulWidget {
  FormInput({Key? key, this.title}) : super(key: key);

  final String? title;

  @override
  FormInputState createState() => FormInputState();
}

class FormInputState extends State<FormInput> {
  reset() {
    controller.text = '';
  }

  getValue() {
    return controller.text;
  }

  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final _title = widget.title ?? '';
    return BrnTextBlockInputFormItem(
      controller: controller,
      title: _title,
      hint: "请输入$_title",
      minLines: 1,
      maxLines: 5,
      onTip: () {},
      onAddTap: () {},
      onRemoveTap: () {},
      onChanged: (newValue) {},
      themeData: BrnFormItemConfig(
        titleTextStyle: FormItemTitleTextStyle,
        titlePaddingSm: const EdgeInsets.only(left: 0),
        titlePaddingLg: const EdgeInsets.only(left: 0, bottom: 0),
        errorPadding: const EdgeInsets.only(left: 0, top: 16, bottom: 0),
      ),
    );
  }
}
