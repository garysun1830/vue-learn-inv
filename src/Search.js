import moment from 'moment'

const search = {
    load(DefautValue) {
        var filterData = {
            SelectAllDates: true,
            SelectAllCategories: true,
            SelectAllPayees: true,
            Dates: [new Date(), new Date()],
            SelectedCategories: [],
            SelectedPayees: [],
            Keyword: null,
            DESC: false,
            SortField: 0
        };
        const strData = localStorage.getItem("Filter");
        if (
            !strData ||
            strData === "{}" ||
            strData === "[object Object]"
        ) {
            this.save(filterData);
        } else {
            try {
                filterData = JSON.parse(strData);
            }
            catch { }
        }
        if (DefautValue) {
            if (!filterData.SortField || filterData.SortField == 0) {
                filterData.SortField = DefautValue.SortField;
                filterData.DESC = false;
            }
            filterData.SelectedCategories = this.removeMissing(filterData.SelectedCategories, DefautValue.AllCatogories);
            filterData.SelectedPayees = this.removeMissing(filterData.SelectedPayees, DefautValue.AllPayees);
        }
        return filterData;
    },
    save(filter) {
        filter.SelectedPayees = this.selectIDs(filter.SelectedPayees);
        filter.SelectedCategories = this.selectIDs(filter.SelectedCategories);
        localStorage.setItem("Filter", JSON.stringify(filter));
    },
    formatDate(value) {
        return moment(String(value)).format('YYYY/MM/DD');
    },
    text(filter) {
        return filter.SelectAllDates ? 'All' : `${this.formatDate(filter.Dates[0])} - ${this.formatDate(filter.Dates[1])}`;
    },
    selectIDs(items) {
        if (items) {
            return items.map((item) => item.ID);
        }
        else {
            return [];
        }
    },
    removeMissing(items, exitings) {
        if (exitings) {
            const exitingIDs = this.selectIDs(exitings);
            return items.filter(item => exitingIDs.indexOf(item.ID) !== -1);
        }
        else {
            return items;
        }
    },
    changeSort(filter, id) {
        if (filter.SortField == id) {
            filter.DESC = !filter.DESC;
        }
        else {
            filter.SortField = id;
            filter.DESC = false;
        }
        this.save(filter);
    }
};

export default search;
