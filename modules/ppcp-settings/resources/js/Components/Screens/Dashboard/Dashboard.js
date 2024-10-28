import TabNavigation from '../../ReusableComponents/TabNavigation';
import Container from '../../ReusableComponents/Container';
import { PAGE_SETTINGS } from '../../ReusableComponents/Container';

const Dashboard = () => {
	return (
		<Container isCard={ false } page={ PAGE_SETTINGS }>
			<TabNavigation />
		</Container>
	);
};

export default Dashboard;
