'use client';
export default function SideBarCreateButton() {
  const styles = 'bg-[url(/buttonBgVideo.mp4)] bg-cover font-bold text-xl text-white rounded-2xl px-4 py-2 m-2';

  return (
    <>
      <button className={styles}>
        <span>Create Post</span>
      </button>
    </>
  );
}
