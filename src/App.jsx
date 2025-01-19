import FormBuilder from './components/FormBuilder/FormBuilder';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Builder</h1>
          <p className="text-gray-600">Create custom forms with drag and drop</p>
        </header>

        <main>
          <FormBuilder />
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Form Builder. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;