import { store } from "../store/store.ts";
import { Provider } from "react-redux";
import { AuthProvider } from "../contexts/AuthContext.tsx";

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <AuthProvider>{children}</AuthProvider>
  </Provider>
);

export default AppProvider;
