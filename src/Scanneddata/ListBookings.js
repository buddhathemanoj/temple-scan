import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, List, Card, Skeleton, Avatar, Button, Popconfirm, message } from "antd";
import Navbar from "../NNavbar/navbar";
import { updateBookingDocument } from "../firebaseuttils";
import { DeleteOutlined } from "@ant-design/icons"; // Add this import statement
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ListBookings = () => {
  const { state } = useLocation();
  const { data } = state || {};
  const { id } = useParams();

  const regularItems = data.selectedItems.filter(item => item.status !== "used");
  const usedItems = data.selectedItems.filter(item => item.status === "used");
  console.log("regularItems",regularItems)
console.log("usedItems",usedItems)
  const handleDeleteItem = async (itemId) => {
    try {
      // Update the Firestore document with status: "used"
      const updatedItems = data.selectedItems.map(item =>
        item.id === itemId ? { ...item, status: "used" } : item
      );

      await updateBookingDocument(id, { selectedItems: updatedItems });

      message.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Error deleting item. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div style={{ marginTop: '20px', padding: '10px 20px' }}>
        {data ? (
          <Card title="User Details">
            <Paragraph>
              <strong>Name:</strong> {data.name}
            </Paragraph>
            <Paragraph>
              <strong>Email:</strong> {data.email}
            </Paragraph>
            <Paragraph>
              <strong>Phone Number:</strong> {data.noofpersons}
            </Paragraph>
            <Paragraph>
              <strong>Total Price:</strong> RM : {data.totalPrice}
            </Paragraph>
          </Card>
        ) : (
          <Skeleton active />
        )}
        <br />
        {data ? (
          <>
            <Card title="Selected Items">
              <List
                dataSource={regularItems}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.image} />}
                      title={
                        <div>
                          <span>{item.title}</span>
                          <br />
                          <span>{item.titleTamil}</span>
                        </div>
                      }
                      description={`Price: ${item.price} | Count: ${item.count} | Total Price: ${item.totalPrice}`}
                    />
                    <Popconfirm
                      title="Are you sure to delete this item?"
                      onConfirm={() => handleDeleteItem(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </List.Item>
                )}
              />
            </Card>
<br/>
            {usedItems.length > 0 && (
           <Card title="Used Items" style={{color:'red',  }}>
           <List
             dataSource={usedItems}
             renderItem={(item) => (
               <List.Item>  
                 <List.Item.Meta
                   avatar={<Avatar src={item.image} />}
                   title={
                     <div>
                       <span>{item.title}</span>
                       <br />
                       <span>{item.titleTamil}</span>
                     </div>
                   }
                   description={`Price: ${item.price} | Count: ${item.count} | Total Price: ${item.totalPrice}`}
                 />
               </List.Item>
             )}
           />
         </Card>
            )}
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
};

export default ListBookings;
