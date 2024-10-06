import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button,Grid } from '@mui/material';

import styles from './Template.module.css';
export const TemplateCards = ({handleCreateSurvey, templates, page, perPage}) => {
  return (
    <Grid container spacing={2}>
      {templates
        .slice((page + 1 - 1) * perPage, (page + 1) * perPage)
        .map((template, key) => (
          <Grid item key={key} xs={4}>
            <div className={styles.template}>
              <div className={styles.title}>{template.nameSurvey}</div>
              <div className={styles.description}>
                {template.descriptionSurvey}
              </div>
              <div className={styles.bottom}>
                <Button
                  variant="text"
                  onClick={() => handleCreateSurvey(false, template.id)}
                >
                  <p>Usa esta plantilla</p>
                  <KeyboardArrowRightIcon />
                </Button>
              </div>
            </div>
          </Grid>
        ))}
    </Grid>
  );
};
