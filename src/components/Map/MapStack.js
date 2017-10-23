import { StackNavigator } from 'react-navigation';

import MapScreen from './MapScreen';
import Avatar from './AddAvatar';
import Location from './AddLocation';
import Title from './AddTitle';
import TaskBuilder from '../Tasks/TaskBuilder'

export default MapStack = StackNavigator({
  Map: { screen: MapScreen },
  Avatar: { screen: Avatar },
  Title: { screen: Title },
  Location: { screen: Location },
  // TaskBuilder: { screen: TaskBuilder }
});
