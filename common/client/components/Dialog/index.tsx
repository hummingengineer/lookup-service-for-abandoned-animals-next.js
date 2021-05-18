import dynamic from 'next/dynamic';
import React, { useState, useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { Form } from '../../types';
import convertDateForm from '../../utils/convertDateForm';

const SelectField = dynamic(() => import('../SelectField'));

const today = new Date().toString();

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    marginTop: () => theme.spacing(2),
  },
  field: {
    marginTop: () => theme.spacing(2),
  },
  checkbox: {
    marginTop: () => theme.spacing(2),
  },
  submit: {
    margin: () => theme.spacing(2, 0, 2),
  },
}));

function Dialog({
  isDialog,
  handleDialog,
  handleCriteria,
}: {
  isDialog: boolean;
  handleDialog: () => void;
  handleCriteria: (event: React.ChangeEvent<unknown>, name: string, value: Form) => void;
}) {
  const classes = useStyles();

  const [form, setForm] = useState<Form>({
    bgnde: today,
    endde: today,
    upkind: '',
    kind: '',
    sido: '',
    sigungu: '',
    shelter: '',
    state: '',
    neuter_yn: 'N',
  });

  const handleForm = useCallback((event, name, value) => {
    if (name === 'bgnde' || name === 'endde') setForm((prev) => ({ ...prev, [name]: value + '' }));
    else if (name === 'neuter_yn') setForm((prev) => ({ ...prev, [name]: value ? 'Y' : 'N' }));
    else setForm((prev) => ({ ...prev, [name]: value + '' }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      handleCriteria(event, 'submit', {
        ...form,
        bgnde: convertDateForm(new Date(form.bgnde), ''),
        endde: convertDateForm(new Date(form.endde), ''),
      });
      handleDialog();
    },
    [form]
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
      <DialogMaterial open={isDialog} onClose={handleDialog}>
        <DialogTitle>유기동물 검색</DialogTitle>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <div className={classes.form}>
              <div className={classes.date}>
                <DatePicker
                  label="시작 날짜"
                  value={form.bgnde}
                  onChange={(date) => handleForm(undefined, 'bgnde', date)}
                  animateYearScrolling
                  disableFuture
                  format="yyyy-MM-dd"
                  style={{ margin: 2 }}
                />
                <DatePicker
                  label="종료 날짜"
                  value={form.endde}
                  onChange={(date) => handleForm(undefined, 'endde', date)}
                  animateYearScrolling
                  disableFuture
                  format="yyyy-MM-dd"
                  minDate={form.bgnde}
                  style={{ margin: 2 }}
                />
              </div>

              <div className={classes.field}>
                <SelectField
                  id="sido"
                  label="시/도"
                  value={{ parent: [''], current: form.sido }}
                  handleForm={handleForm}
                />
              </div>

              {form.sido && (
                <div className={classes.field}>
                  <SelectField
                    id="sigungu"
                    label="시/군/구"
                    value={{ parent: [form.sido], current: form.sigungu }}
                    handleForm={handleForm}
                  />
                </div>
              )}

              {form.sigungu && (
                <div className={classes.field}>
                  <SelectField
                    id="shelter"
                    label="보호소"
                    value={{ parent: [form.sido, form.sigungu], current: form.shelter }}
                    handleForm={handleForm}
                  />
                </div>
              )}

              <div className={classes.radio}>
                <FormControl>
                  <FormLabel>분류</FormLabel>
                  <RadioGroup
                    row
                    name="upkind"
                    value={form.upkind}
                    onChange={(e) => {
                      handleForm(e, e.target.name, e.target.value);
                      handleForm(undefined, 'kind', '');
                    }}
                  >
                    <FormControlLabel value="417000" control={<Radio />} label="개" />
                    <FormControlLabel value="422400" control={<Radio />} label="고양이" />
                    <FormControlLabel value="429900" control={<Radio />} label="기타" />
                    <FormControlLabel value="" control={<Radio />} label="전체" />
                  </RadioGroup>
                </FormControl>
              </div>

              {form.upkind && (
                <div className={classes.field}>
                  <SelectField
                    id="kind"
                    label="품종"
                    value={{ parent: [form.upkind], current: form.kind }}
                    handleForm={handleForm}
                  />
                </div>
              )}

              <div className={classes.checkbox}>
                <FormControl>
                  <FormLabel>중성화 여부</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.neuter_yn === 'Y' ? true : false}
                          onChange={(e) => handleForm(e, e.target.name, e.target.checked)}
                          name="neuter_yn"
                        />
                      }
                      label="중성화"
                    />
                  </FormGroup>
                </FormControl>
              </div>

              <div className={classes.radio}>
                <FormControl>
                  <FormLabel>상태</FormLabel>
                  <RadioGroup
                    row
                    name="state"
                    value={form.state}
                    onChange={(e) => handleForm(e, e.target.name, e.target.value)}
                  >
                    <FormControlLabel value="" control={<Radio />} label="전체" />
                    <FormControlLabel value="notice" control={<Radio />} label="공고중" />
                    <FormControlLabel value="protect" control={<Radio />} label="보호중" />
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={classes.submit}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  검색
                </Button>
              </div>
            </div>
          </Container>
        </DialogContent>
      </DialogMaterial>
    </MuiPickersUtilsProvider>
  );
}

export default React.memo(Dialog);
