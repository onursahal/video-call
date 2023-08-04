export interface RouterType {
  title: string;
  path: string;
  element: React.ReactNode;
  protectedRoute: boolean;
  exact?: boolean;
}
