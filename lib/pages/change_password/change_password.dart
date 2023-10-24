/********************************************************************************
 *
 *  密码修改
 *
 *******************************************************************************/

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../utils/tool/encrypt_utils.dart';
import '../login/user_util.dart' show UserUtil;
import '../../utils/index.dart' show Tips;
import 'change_password_service.dart';

class ChangePasswordForm extends StatefulWidget {
  const ChangePasswordForm({super.key});

  @override
  ChangePasswordFormState createState() => ChangePasswordFormState();
}

class PersonData {
  String? password = '';
  String? newPassword = '';
  String? retypePassword = '';

  @override
  String toString() {
    return 'PersonData{password: $password, newPassword: $newPassword, retypePassword: $retypePassword}';
  }
}

class PasswordField extends StatefulWidget {
  const PasswordField({
    super.key,
    this.restorationId,
    this.fieldKey,
    this.hintText,
    this.labelText,
    this.helperText,
    this.onSaved,
    this.validator,
    this.onFieldSubmitted,
    this.focusNode,
    this.textInputAction,
  });

  final String? restorationId;
  final Key? fieldKey;
  final String? hintText;
  final String? labelText;
  final dynamic? helperText;
  final FormFieldSetter<String>? onSaved;
  final FormFieldValidator<String>? validator;
  final ValueChanged<String>? onFieldSubmitted;
  final FocusNode? focusNode;
  final TextInputAction? textInputAction;

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> with RestorationMixin {
  final RestorableBool _obscureText = RestorableBool(true);

  @override
  String? get restorationId => widget.restorationId;

  @override
  void restoreState(RestorationBucket? oldBucket, bool initialRestore) {
    registerForRestoration(_obscureText, 'obscure_text');
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      key: widget.fieldKey,
      restorationId: 'password_text_field',
      obscureText: _obscureText.value,
      maxLength: 16,
      onSaved: widget.onSaved,
      validator: widget.validator,
      onFieldSubmitted: widget.onFieldSubmitted,
      decoration: InputDecoration(
        filled: true,
        hintText: widget.hintText,
        labelText: widget.labelText,
        helperText: widget.helperText,
        helperMaxLines: 2,
        errorMaxLines: 2,
        errorStyle: TextStyle(color: Colors.red),
        suffixIcon: IconButton(
          onPressed: () {
            setState(() {
              _obscureText.value = !_obscureText.value;
            });
          },
          hoverColor: Colors.transparent,
          icon: Icon(
            _obscureText.value ? Icons.visibility : Icons.visibility_off,
            semanticLabel: _obscureText.value ? '1' : '2',
          ),
        ),
      ),
    );
  }
}

class ChangePasswordFormState extends State<ChangePasswordForm>
    with RestorationMixin {
  PersonData person = PersonData();

  late FocusNode _username, _newPassword, _password, _retypePassword;
  final _usernameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    initData();
    _username = FocusNode();
    _newPassword = FocusNode();
    _password = FocusNode();
    _retypePassword = FocusNode();
  }

  Future<void> initData() async {
    final userData = await UserUtil.getUserInfo();
    setState(() {
      _usernameController.text = userData?.username ?? '';
    });
  }

  @override
  void dispose() {
    _username.dispose();
    _newPassword.dispose();
    _password.dispose();
    _retypePassword.dispose();
    super.dispose();
  }

  // void showInSnackBar(String value) {
  //   ScaffoldMessenger.of(context).hideCurrentSnackBar();
  //   ScaffoldMessenger.of(context).showSnackBar(SnackBar(
  //     content: Text(value),
  //   ));
  // }

  @override
  String get restorationId => 'text_field_demo';

  dynamic autovalidateMode =
      AutovalidateMode.values[AutovalidateMode.disabled.index];

  @override
  void restoreState(RestorationBucket? oldBucket, bool initialRestore) {}

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<FormFieldState<String>> _passwordFieldKey =
      GlobalKey<FormFieldState<String>>();

  final GlobalKey<FormFieldState<String>> _newPasswordFieldKey =
      GlobalKey<FormFieldState<String>>();

  final GlobalKey<FormFieldState<String>> _retypePasswordFieldKey =
      GlobalKey<FormFieldState<String>>();

  void _handleSubmitted() async {
    final form = _formKey.currentState!;
    if (!form.validate()) {
      setState(() {
        autovalidateMode =
            AutovalidateMode.values[AutovalidateMode.always.index];
      });
      // showInSnackBar(
      //   '请修改错误信息后再提交',
      // );
    } else {
      form.save();
      if (person.newPassword == person.password) {
        Tips.info('新老密码不能重复');
      } else if (person.newPassword != person.retypePassword) {
        Tips.info('新密码和确认密码不一致');
      } else {
        final userData = await UserUtil.getUserInfo();
        final currentPassword = await encode(person?.password ?? '');
        final currentNewPassword = await encode(person?.newPassword ?? '');
        final res = await changePasswordApi({
          'userId': userData.userId,
          'phone': userData.phone,
          'password': currentPassword,
          'newPassword': currentNewPassword,
        });
        if (res != null) {
          Tips.info('密码修改成功，请重新登录');
          Timer(Duration(seconds: 2), () {
            Navigator.pushNamedAndRemoveUntil(
              context,
              '/login',
                  (Route<dynamic> route) => false,
            );
          });
        }
      }
    }
  }

  String? _validatePassword(passwordField, String labelText, String? val) {
    if (passwordField.value == null || passwordField.value!.isEmpty) {
      return '请输入$labelText';
    }
    final passwordExp =
        RegExp(r'(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,16}$');
    if (!passwordExp.hasMatch(val!)) {
      return '密码长度要求8-16位，且必须包含数字、特殊字符、大写字母、小写字母';
    }
    return null;
  }

  String? _validateCurrentPassword(String? value) {
    return _validatePassword(_passwordFieldKey.currentState!, '密码', value);
  }

  String? _validateNewPassword(String? value) {
    return _validatePassword(_newPasswordFieldKey.currentState!, '新密码', value);
  }

  String? _validateRetypePassword(String? value) {
    return _validatePassword(
        _retypePasswordFieldKey.currentState!, '确认密码', value);
  }

  @override
  Widget build(BuildContext context) {
    const sizedBoxSpace = SizedBox(height: 24);
    return Form(
      key: _formKey,
      autovalidateMode: autovalidateMode,
      onChanged: () {},
      child: Scrollbar(
        child: SingleChildScrollView(
          restorationId: 'text_field_demo_scroll_view',
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: [
              TextFormField(
                controller: _usernameController,
                restorationId: 'name_field',
                textInputAction: TextInputAction.next,
                textCapitalization: TextCapitalization.words,
                decoration: InputDecoration(
                  enabled: false,
                  filled: true,
                  hintText: '请输入用户名',
                  labelText: '用户名',
                  errorStyle: TextStyle(color: Colors.red),
                ),
                // onChanged: (v) {},
                // validator: _validateName,
              ),
              sizedBoxSpace,
              PasswordField(
                restorationId: 'password_field',
                textInputAction: TextInputAction.next,
                focusNode: _password,
                fieldKey: _passwordFieldKey,
                hintText: '请输入旧密码',
                labelText: '旧密码',
                onSaved: (value) {
                  setState(() {
                    person.password = value;
                    _password.requestFocus();
                  });
                },
                validator: _validateCurrentPassword,
              ),
              PasswordField(
                restorationId: 'new_password_field',
                textInputAction: TextInputAction.next,
                focusNode: _newPassword,
                fieldKey: _newPasswordFieldKey,
                hintText: '请输入新密码',
                labelText: '新密码',
                onSaved: (value) {
                  setState(() {
                    person.newPassword = value;
                    _newPassword.requestFocus();
                  });
                },
                validator: _validateNewPassword,
              ),
              PasswordField(
                restorationId: 'retype_password_field',
                textInputAction: TextInputAction.next,
                focusNode: _retypePassword,
                fieldKey: _retypePasswordFieldKey,
                hintText: '请输入确认密码',
                labelText: '确认密码',
                helperText: '密码长度要求8-16位，且必须包含数字、特殊字符、大写字母、小写字母',
                onSaved: (value) {
                  setState(() {
                    person.retypePassword = value;
                    _retypePassword.requestFocus();
                  });
                },
                validator: _validateRetypePassword,
              ),
              sizedBoxSpace,
              Center(
                child: Container(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(minimumSize: Size(100, 50)),
                    onPressed: _handleSubmitted,
                    child: Text('确定修改'),
                  ),
                ),
              ),
              sizedBoxSpace,
            ],
          ),
        ),
      ),
    );
  }
}
