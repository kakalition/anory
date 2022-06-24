import Spacer from '../Utilities/Spacer';
import AnoryLogo from './AnoryLogo';
import AnoryPrimaryButtonComponent from './AnoryPrimaryButtonComponent';
import AnorySideNavButtonComponent from './AnorySideNavButtonComponent';

export default function SideNavBarComponent({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex flex-col justify-between py-8 pr-4 pl-16 w-full h-full">
      <div className="flex flex-col gap-3 w-full">
        <AnoryPrimaryButtonComponent text="New Post" onClick={() => console.log('implement')} />
        <Spacer height="0.75rem" />
        <AnorySideNavButtonComponent stateKey="alls" currentState={activeTab} text="All Stories" />
        <AnorySideNavButtonComponent stateKey="a" currentState={activeTab} text="Most Views" />
        <AnorySideNavButtonComponent stateKey="b" currentState={activeTab} text="Most Likes" />
        <AnorySideNavButtonComponent stateKey="c" currentState={activeTab} text="Most Replies" />
      </div>
      <div className="w-full">
        <AnoryLogo />
        <Spacer height="1rem" />
        <div className="flex flex-row">
          <button type="button">Terms of service</button>
          <Spacer width="0.5rem" />
          <button type="button">Accessibility</button>
        </div>
        <Spacer height="0.5rem" />
        <div className="flex flex-row">
          <button type="button">Privacy policy</button>
          <Spacer width="0.5rem" />
          <button type="button">Cookie policy</button>
        </div>
      </div>
    </div>
  );
}
