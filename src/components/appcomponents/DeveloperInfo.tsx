import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {getGitUser, GitHubUser} from '../../services/gitAPI';
import {useEffect, useState} from 'react';
import {useColors} from '../../theme/useColors';
import Lucide from '@react-native-vector-icons/lucide';

export default function DeveloperInfo() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  const Colors = useColors();
  const styles = getStyles(Colors);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getGitUser();
      if (data) {
        setUser(data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.black} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Image source={{uri: user?.avatar_url}} style={styles.avatar} />
        <View style={styles.bioContainer}>
          <Text style={[styles.text, styles.nameText]}>
            {user?.name} ~ ({user?.login})
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
            {user?.bio}
          </Text>
          <Text style={styles.text}>Experience : {user?.company}</Text>
          <Text style={[styles.text, styles.nameText]}>
            Location : {user?.location}
          </Text>
        </View>
      </View>
      <View style={styles.accountContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL(user?.html_url || '')}
          style={styles.accountButton}>
          <Lucide name="github" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://subhadeepdas.netlify.app/')}
          style={styles.accountButton}>
          <Lucide name="file-user" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/subhadeepsad/')
          }
          style={styles.accountButton}>
          <Lucide name="linkedin" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:sd535682@gmail.com')}
          style={styles.accountButton}>
          <Lucide name="at-sign" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:+917001482062')}
          style={styles.accountButton}>
          <Lucide name="phone" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (Colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      padding: '4%',
      backgroundColor: Colors.devCardBackground,
      borderRadius: 10,
      flexDirection: 'column',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: Colors.borderGray,
    },
    bioContainer: {
      flexShrink: 1,
      flexDirection: 'column',
      gap: 2,
    },
    text: {
      fontSize: 14,
      color: Colors.textGray,
      fontWeight: '500',
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    accountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginTop: '5%',
      marginBottom: '2%',
    },
    accountButton: {
      borderWidth: 2,
      borderColor: Colors.borderGray,
      borderRadius: 50,
      padding: 6,
      backgroundColor: Colors.white,
    },
    nameText: {
      fontWeight: 'bold',
      fontSize: 14,
    },
  });
