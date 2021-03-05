import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

export const RouteSplash = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'com.splash',
        options: {
          statusBar: {
            translucent: false,
          },
        },
      },
    },
  });
};

export const RouteProtect = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.protect',
            },
          },
        ],
      },
    },
  });
};

export const RouteDefault = async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('home', 25),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.list',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('appstore1', 25),
                },
              },
            },
          },
          {
            stack: {
              id: 'RakBuku',
              children: [
                {
                  component: {
                    name: 'com.rak',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('book', 25),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.profile',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('meho', 25),
                },
              },
            },
          },
        ],
      },
    },
  });
};
