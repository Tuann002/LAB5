//AddNewService.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddNewService = ({ navigation }) => {
  
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const addNewService = async () => {
    try {
      // Thêm dịch vụ mới vào Firestore
      await firestore().collection('services').add({
        name: serviceName,
        description: serviceDescription,
        // Thêm các trường khác tùy thuộc vào yêu cầu của bạn
      });

      console.log('Dịch vụ đã được thêm thành công vào Firestore');
      // Hiển thị thông báo thành công
      alert('Dịch vụ đã được thêm thành công vào Firestore');

      // Sau khi thêm thành công, chuyển đến màn hình "Admin"
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi thêm dịch vụ vào Firestore:', error);

      // Hiển thị thông báo lỗi
      alert('Lỗi khi thêm dịch vụ vào Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả dịch vụ"
        value={serviceDescription}
        onChangeText={(text) => setServiceDescription(text)}
      />
      <Button title="Thêm Dịch Vụ" onPress={addNewService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddNewService;
