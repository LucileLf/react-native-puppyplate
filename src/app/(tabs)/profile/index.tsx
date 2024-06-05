// tabs/profile/index.tsx
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useAuth } from "@/providers/AuthProvider";
import { profileImages } from '@assets/data/users'
import { Profile } from '@/types'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native';
import editProfilePicture from '@assets/images/edit-profile.png'
import inviteFriendPicture from '@assets/images/invite-friend.png'
import ressourcesPicture from '@assets/images/ressources.png'
import settingsPicture from '@assets/images/settings.png'


const ProfileScreen = () => {
  const {session, loading} = useAuth();
  // console.log('session user id', session?.user.id);
  const {colors} = useTheme();

  const [ profile, setProfile ] = useState<Profile | null>(null)
  // const profileImages = {
  //   '162a1165-2939-4a55-b6c2-c0c6136d51be': require('@assets/images/dabdoubeh.jpg'),
  //   // Add more keys and requires for other images
  //   defaultImage: require('@assets/images/no-user-image.webp'), // Default/fallback image
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <ActivityIndicator/>

  if (!profile) return <Text>No profile found</Text>
  const styles = StyleSheet.create({
    mainContainer: {
      // justifyContent: 'center',
      paddingHorizontal: 2,
      paddingVertical: 8
    },
    profilePicture: {
      height: 150,
      aspectRatio: 1,
      borderRadius: 100,
      overflow: 'hidden',
    },
    itemContainer: {
      height: 90,
      // width: '90%',
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: '1%',
      marginHorizontal: '4%',
      borderRadius: 8,
      paddingHorizontal: 8
    },
    itemImage: {
      width: '33%',
      maxHeight: '100%',
    },
    itemLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '4%'
    },
    logoutButton: {
      backgroundColor: colors.buttonBackground,
      padding: 15,
      alignItems: 'center',
      borderRadius: 100,
      marginVertical: 10,
      // justifyContent: 'center',
      // paddingBottom: 10
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.buttonText,
    }
  });

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{ alignItems: 'center', justifyContent: 'space-between'}}>
        <Image
          source={profile?.avatar_url ? profileImages[profile.id] : profileImages.defaultImage}
          style={styles.profilePicture}
          resizeMode='cover'
        />
        <Text style={{fontSize: 50, color: colors.buttonText}}>{profile?.username}</Text>
        {/* <AntDesign name="edit" size={24}  /> */}
      </View>

      <View style={styles.itemContainer}>
        {/* <Text>{profile?.full_name}</Text> */}
        <Image
          source={editProfilePicture}
          style={styles.itemImage}
          resizeMode='contain'
        />
        <View style={styles.itemLabel}>
          <Text>Modifier mon profil</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>

      <View style={styles.itemContainer}>
        {/* <Text>{profile?.full_name}</Text> */}
        <Image
          source={inviteFriendPicture}
          style={styles.itemImage}
          resizeMode='contain'
        />
        <View style={styles.itemLabel}>
            <Text>Inviter un.e ami.e</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>

      <View style={styles.itemContainer}>
        {/* <Text>{profile?.full_name}</Text> */}
        <Image
          source={ressourcesPicture}
          style={styles.itemImage}
          resizeMode='contain'
        />
        <View style={styles.itemLabel}>
          <Text>Nos ressources</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Image
          source={settingsPicture}
          style={styles.itemImage}
          resizeMode='contain'
          />
        <View style={styles.itemLabel}>
          <Text>Paramètres</Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
      <Text>{session?.user.email}</Text>
      <View
        style={{ flex: 1, justifyContent: 'center', paddingHorizontal: '5%' }}>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {supabase.auth.signOut()}}
        >
          <Text style= {{color: colors.buttonText}}>Déconnecter</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
