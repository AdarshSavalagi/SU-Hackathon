
import Lottie  from 'lottie-react'; // Import Lottie component
import logoutAnimation from '../../assets/Image.json'; // Replace with your Lottie animation file

function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Lottie animationData={logoutAnimation} loop={true} style={{ width: '300px', height: '300px' }} />
      <h1 className="text-2xl font-bold mt-4">Your Exam Has Ended!</h1>
      <p className="mt-2 text-lg">Thank you for participating. We hope to see you again!</p>
      <button 
        className="mt-6 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 transition"
        onClick={() => {
          // Logic to redirect to the login or home page
          window.location.href = '/login'; // Adjust the path as needed
        }}
      >
        Go to Login
      </button>
    </div>
  );
}

export default LogoutPage;
