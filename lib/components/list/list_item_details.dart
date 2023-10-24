import 'package:animations/animations.dart';
import 'package:flutter/material.dart';

const String _loremIpsumParagraph =
    'mattis molestie. Adipiscing elit duis tristique sollicitudin nibh sit '
    'amet commodo nulla. Pretium viverra suspendisse potenti nullam ac tortor '
    'vitae';

class DetailsPage extends StatelessWidget {
  const DetailsPage();

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'DetailsPage',
        ),
      ),
      body: ListView(
        children: [
          Container(
            color: Colors.black38,
            height: 250,
            child: Padding(
              padding: const EdgeInsets.all(70),
              child: Image.asset(
                'asset/images/devices/img.png',
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'demoMotionPlaceholderTitle',
                  style: textTheme.headlineSmall!.copyWith(
                    color: Colors.black54,
                    fontSize: 30,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Text(
                  _loremIpsumParagraph,
                  style: textTheme.bodyMedium!.copyWith(
                    color: Colors.black54,
                    height: 1.5,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class OpenListDetailsWrapper extends StatelessWidget {
  const OpenListDetailsWrapper({
    required this.closedBuilder,
    required this.openBuilder,
    required this.transitionType,
  });

  final CloseContainerBuilder closedBuilder;
  final CloseContainerBuilder openBuilder;
  final ContainerTransitionType transitionType;

  @override
  Widget build(BuildContext context) {
    return OpenContainer<bool>(
      transitionType: transitionType,
      closedColor: Colors.transparent,
      openBuilder: openBuilder,
      tappable: false,
      closedElevation: 0,
      openElevation: 0,
      closedBuilder: closedBuilder,
    );
  }
}

class ListItem extends StatelessWidget {
  const ListItem({required this.openContainer, this.height, this.child});

  final VoidCallback openContainer;
  final double? height;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return InkWellOverlay(
      openContainer: openContainer,
      height: height,
      child: child ?? Container(),
    );
  }
}

class InkWellOverlay extends StatelessWidget {
  const InkWellOverlay({
    required this.openContainer,
    this.height,
    required this.child,
  });

  final VoidCallback openContainer;
  final double? height;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: InkWell(
        onTap: openContainer,
        child: child,
      ),
    );
  }
}

class DetailsCard extends StatelessWidget {
  const DetailsCard({required this.openContainer});

  final VoidCallback openContainer;

  @override
  Widget build(BuildContext context) {
    return InkWellOverlay(
      openContainer: openContainer,
      height: 300,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: Container(
              color: Colors.black38,
              child: Center(
                child: Image.asset(
                  'asset/images/devices/img.png',
                  width: 100,
                ),
              ),
            ),
          ),
          ListTile(
            title: Text(
              'demoMotionPlaceholderTitle',
            ),
            subtitle: Text(
              'demoMotionPlaceholderSubtitle',
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(
              left: 16,
              right: 16,
              bottom: 16,
            ),
            child: Text(
              'Lorem ipsum dolor sit amet, consectetur '
              'adipiscing elit, sed do eiusmod tempor.',
              style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                    color: Colors.black54,
                    inherit: false,
                  ),
            ),
          ),
        ],
      ),
    );
  }
}

class SmallDetailsCard extends StatelessWidget {
  const SmallDetailsCard({
    required this.openContainer,
    required this.subtitle,
  });

  final VoidCallback openContainer;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return InkWellOverlay(
      openContainer: openContainer,
      height: 225,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            color: Colors.black38,
            height: 150,
            child: Center(
              child: Image.asset(
                'asset/images/devices/img.png',
                width: 80,
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'demoMotionPlaceholderTitle',
                    style: textTheme.titleLarge,
                  ),
                  const SizedBox(
                    height: 4,
                  ),
                  Text(
                    subtitle,
                    style: textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
