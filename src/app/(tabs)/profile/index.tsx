// tabs/profile/index.tsx
import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useAuth } from "@/providers/AuthProvider";
import { profileImages } from '@assets/data/users'
import { Profile } from '@/types'


const ProfileScreen = () => {
  const {session, loading, error} = useAuth();
  // console.log('session user id', session?.user.id);

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

  if (!profile && error) return <Text>No profile found</Text>

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{profile?.username}</Text>
      <Text style={{ color: 'white' }}>{profile?.full_name}</Text>
      <Text style={{ color: 'white' }}>{session?.user.email}</Text>
      <Image source={profile?.avatar_url ? profileImages[profile.id] : profileImages.defaultImage}
        style={{height: 100, aspectRatio: 1}}
        resizeMode='contain'
      />
      <Button onPress={() => {
        supabase.auth.signOut()
      }} text='Déconnecter' />
    </View>
  );
};

export default ProfileScreen;
