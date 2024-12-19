const SuccessModal = () => {
	return (
		<div>
			<dialog
				id='success-modal'
				className='modal'
			>
				<div className='modal-box'>
					<h3 className='text-lg font-bold'>Success !</h3>
					<p className='py-4'>Your changes are saved !</p>
				</div>
				<form
					method='dialog'
					className='modal-backdrop'
				>
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default SuccessModal;
