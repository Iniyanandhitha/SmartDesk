export type Role = 'Employee' | 'Technician' | 'Team Lead' | 'Administrator'

export type MockUser = { email: string; password: string; firstName: string; fullName: string; role: Role; initials: string }

export const demoUsers: MockUser[] = [
  { email: 'employee@smartdesk.demo', password: 'SmartDesk@123', firstName: 'Karthik', fullName: 'Karthik Srinivas', role: 'Employee', initials: 'KS' },
  { email: 'technician@smartdesk.demo', password: 'SmartDesk@123', firstName: 'Arjun', fullName: 'Arjun Mehta', role: 'Technician', initials: 'AM' },
  { email: 'lead@smartdesk.demo', password: 'SmartDesk@123', firstName: 'Priya', fullName: 'Priya Shah', role: 'Team Lead', initials: 'PS' },
  { email: 'admin@smartdesk.demo', password: 'SmartDesk@123', firstName: 'Meera', fullName: 'Meera Iyer', role: 'Administrator', initials: 'MI' },
]

export function authenticate(email: string, password: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password) ?? null
}

export function publicUser(user: MockUser) {
  const { password: _password, ...safeUser } = user
  return safeUser
}
