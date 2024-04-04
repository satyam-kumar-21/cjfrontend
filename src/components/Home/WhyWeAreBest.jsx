import Card from "./Card";

const WhyWeAreBest = () => {
    return (
      <div className="flex flex-col items-center md:p-8 p-0">
        <h1 className="md:text-3xl text-xl text-blue-900 font-bold mb-6">Why We Are the Best</h1>
        <div className="flex md:flex-row flex-col justify-center">
          <Card
            imageSrc="https://imgs.search.brave.com/vU4L1OUsBQvQC_E6e91addMFBrQUbZw8SUdy6bdM2Mk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzc5LzM3Lzg4/LzM2MF9GXzc5Mzc4/ODc1X1cwUXlpMTNa/QnJhdDh0MzV5Rlh2/TWZwVFJENkJKcnJm/LmpwZw"
            title="Expert Instruction"
            description="Our institute boasts a team of seasoned professionals with extensive experience in the field, providing unparalleled guidance and mentorship to students."
          />
          <Card
            imageSrc="https://imgs.search.brave.com/cYT7Nuy8PoyAVp1tK1x7OQ36WRXzHx-lzQPLDDvQ4x8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzIzLzA3LzY0/LzM2MF9GXzMyMzA3/NjQ5Ml96VlFscld6/ME9IdTF6NDdCRDFC/RUdwZW9EaWVBUDli/Ri5qcGc"
            title="Comprehensive Curriculum"
            description="We offer a comprehensive curriculum designed to cover the latest industry trends and technologies, ensuring students are well-prepared for real-world challenges."
          />
          <Card
            imageSrc="https://imgs.search.brave.com/cWYNw0GyHwdKk7LwbDCQvhlaU2w_81meITJGxw-VNYg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA"
            title="Hands-on Learning"
            description="Through practical, hands-on projects and workshops, students gain invaluable experience applying theoretical knowledge to real-world scenarios, fostering a deeper understanding of coding concepts."
          />
        </div>
      </div>
    );
  };
  
  export default WhyWeAreBest;