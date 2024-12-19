import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const steps = data;
	const [activeIndex, setActiveIndex] = useState(1);
	const [dis, setDis] = useState(true);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	function clickUp() {
		setActiveIndex(activeIndex + 1);
		setDis(false);
		if (activeIndex === steps.length) {
			setActiveIndex(1);
			setDis(true);
		}
	}

	function clickDown() {
		const prevIndex = activeIndex - 1;
		setActiveIndex(prevIndex);
		if (prevIndex === 1) {
			setDis(true);
		}
	}

	const itemPitch = steps.map((item, i) => {
		const index = i + 1;
		const activeStyle = activeIndex === index ? styles.active : '';
		const doneStyle = activeIndex > index ? styles.done : '';
		const fullStyle = `${styles['steps-item']} ${activeStyle} ${doneStyle}`;
		const clickButton = () => {
			setActiveIndex(index);
		};

		return (
			<li onClick={clickButton} key={item.id} className={fullStyle}>
				<button key={item.id} className={`${styles['steps-item-button']} `}>
					{index}
				</button>
				Шаг {index}
			</li>
		);
	});

	const activePitch = steps.find((a, i) => i + 1 === activeIndex);

	const title = <h1 key={activePitch.id}>{activePitch.title}</h1>;
	const content = <div className={styles['steps-content']}>{activePitch.content}</div>;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				{title}
				<div className={styles.steps}>
					{content}
					<ul className={styles['steps-list']}>{itemPitch}</ul>
					<div className={styles['buttons-container']}>
						<button
							onClick={clickDown}
							className={styles.button}
							disabled={dis}
						>
							Назад
						</button>
						<button onClick={clickUp} className={styles.button}>
							{activeIndex < steps.length ? 'Далее' : 'Начать сначала'}
						</button>
						{activeIndex}
					</div>
				</div>
			</div>
		</div>
	);
};
